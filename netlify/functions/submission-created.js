// Netlify Forms event function — auto-invoked whenever a form submission is
// created on this site. When someone signs up through the EmailCapture
// component (form-name="pws-newsletter"), we:
//   1. check whether the contact already exists in the PromptWritingStudio
//      Resend segment (GET /audiences/{segmentId}/contacts/{email}),
//   2. add them as a contact to the segment,
//   3. apply set-if-empty attribution properties (source_surface, signup_page,
//      signup_utm_*, signup_referrer) via PATCH /contacts/{email},
//   4. fire the `promptwritingstudio.welcome` event ONLY when `!exists` so
//      repeat signups do not trigger duplicate welcome sequences, and
//   5. emit cookie-free server-side PostHog `Signup Confirmed` / `Signup Failed`.

const crypto = require('crypto');

const RESEND_API = 'https://api.resend.com';
const WELCOME_EVENT =
  process.env.RESEND_WELCOME_EVENT || 'promptwritingstudio.welcome';
const POSTHOG_ENDPOINT = 'https://eu.i.posthog.com/i/v0/e/';
// Public PostHog EU project token (same client-side key shipped across all sites).
const POSTHOG_PUBLIC_TOKEN =
  process.env.POSTHOG_API_KEY ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  'phc_pBxJ3BtqHYzDS52caeqcRBzEmSd697fSc6BwCfnrLTXR'; // gitleaks:allow
const SITE = 'promptwritingstudio';
const HOST = 'promptwritingstudio.com';
const SOURCE_MAX_LENGTH = 120;

function sanitizeSlug(val, fallback = 'newsletter') {
  const raw = String(val || '')
    .trim()
    .toLowerCase()
    .replace(/^promptwritingstudio@/, '');
  const clean = raw
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return clean || fallback;
}

function sanitizePage(pageInput, fallbackUrl) {
  const raw = String(pageInput || '').trim();
  if (raw.startsWith('/')) {
    return raw.split('?')[0].split('#')[0].slice(0, SOURCE_MAX_LENGTH);
  }
  for (const candidate of [raw, fallbackUrl]) {
    if (!candidate) continue;
    try {
      const parsed = new URL(String(candidate));
      if (parsed.pathname) {
        return parsed.pathname.slice(0, SOURCE_MAX_LENGTH);
      }
    } catch {
      // ignore invalid URL
    }
  }
  return '';
}

function sanitizeUtm(val) {
  const v = String(val || '').trim().toLowerCase();
  return /^[a-z0-9._~+:-]{1,60}$/.test(v) ? v : '';
}

function sanitizeReferrer(val) {
  const v = String(val || '').trim().toLowerCase();
  if (!v) return '';
  if (/^[a-z0-9.-]{1,80}$/.test(v) && !v.includes('/')) {
    return v;
  }
  try {
    const host = new URL(v).hostname.toLowerCase();
    return /^[a-z0-9.-]{1,80}$/.test(host) ? host : '';
  } catch {
    return '';
  }
}

function buildAttribution(data, payload, headers = {}) {
  const slug = sanitizeSlug(data.form_id || data.source || 'newsletter', 'newsletter');
  const source_surface = `${SITE}@${slug}`;
  const fallbackReferer =
    payload.referrer ||
    payload.site_url ||
    headers.referer ||
    headers.Referer ||
    '';
  const signup_page = sanitizePage(data.signup_page, fallbackReferer);
  const signup_utm_source = sanitizeUtm(data.signup_utm_source || data.utm_source);
  const signup_utm_medium = sanitizeUtm(data.signup_utm_medium || data.utm_medium);
  const signup_utm_campaign = sanitizeUtm(data.signup_utm_campaign || data.utm_campaign);
  const signup_referrer = sanitizeReferrer(data.signup_referrer);

  return {
    source_surface,
    signup_page,
    signup_utm_source,
    signup_utm_medium,
    signup_utm_campaign,
    signup_referrer,
  };
}

function isEmptyProp(val) {
  return val === null || val === undefined || val === '' || val === 'unknown';
}

async function getExistingContact({ apiKey, segmentId, email }) {
  try {
    const resp = await fetch(
      `${RESEND_API}/audiences/${segmentId}/contacts/${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (resp.status === 200) {
      const body = await resp.json().catch(() => ({}));
      const contact = body && body.data ? body.data : body || {};
      return {
        exists: true,
        properties:
          contact && typeof contact.properties === 'object' && contact.properties
            ? contact.properties
            : {},
      };
    }
    if (resp.status === 404) {
      return { exists: false, properties: {} };
    }
    return { exists: false, properties: {} };
  } catch (err) {
    console.warn('submission-created: contact lookup failed (non-fatal)', err?.message);
    return { exists: false, properties: {} };
  }
}

// Add the subscriber to the Resend segment. Idempotent: an already-present
// contact returns non-2xx, which we treat as a soft success (re-subscribe).
async function addContactToSegment({ apiKey, segmentId, email }) {
  const resp = await fetch(`${RESEND_API}/audiences/${segmentId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  if (!resp.ok) {
    const body = await resp.text().catch(() => '');
    if (resp.status !== 409 && !body.toLowerCase().includes('already exists')) {
      throw new Error(`Resend add-contact ${resp.status}: ${body}`);
    }
    // 409 / "already exists" is expected on re-submit — not an error.
    console.warn(`submission-created: add-contact ${resp.status}: ${body}`);
  }
}

async function patchContactAttribution({ apiKey, email, existingProperties = {}, attribution = {} }) {
  const toPatch = {};
  const keys = [
    'source_surface',
    'signup_page',
    'signup_utm_source',
    'signup_utm_medium',
    'signup_utm_campaign',
    'signup_referrer',
  ];

  for (const key of keys) {
    const val = attribution[key];
    if (val && isEmptyProp(existingProperties[key])) {
      toPatch[key] = val;
    }
  }

  if (Object.keys(toPatch).length === 0) {
    return { patched: false, properties: {} };
  }

  try {
    const resp = await fetch(`${RESEND_API}/contacts/${encodeURIComponent(email)}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: toPatch }),
    });
    if (!resp.ok) {
      const body = await resp.text().catch(() => '');
      console.warn(`submission-created: patch-contact ${resp.status}: ${body}`);
      return { patched: false, properties: toPatch };
    }
    return { patched: true, properties: toPatch };
  } catch (err) {
    console.warn('submission-created: patch-contact failed (non-fatal)', err?.message);
    return { patched: false, properties: toPatch };
  }
}

// Start the welcome series. The contact must exist first: the automation
// resolves its recipient from the contact record, not from this payload.
async function fireWelcomeEvent({ apiKey, email, source }) {
  const resp = await fetch(`${RESEND_API}/events/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: WELCOME_EVENT,
      email,
      payload: { source: source || 'site' },
    }),
  });

  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Resend event ${resp.status}: ${body}`);
  }

  return resp.json();
}

function hashEmailDistinctId(email) {
  if (!email) return `pws_anon_${Date.now()}`;
  const hash = crypto
    .createHash('sha256')
    .update(String(email).trim().toLowerCase())
    .digest('hex')
    .slice(0, 32);
  return `pws_${hash}`;
}

async function capturePostHogEvent({ event, email, attribution = {}, extraProperties = {} }) {
  try {
    const form_id = attribution.source_surface || `${SITE}@newsletter`;
    const signup_page = attribution.signup_page || '';
    const labelled = Boolean(form_id && signup_page);
    await fetch(POSTHOG_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_PUBLIC_TOKEN,
        event,
        distinct_id: hashEmailDistinctId(email),
        properties: {
          $host: HOST,
          $process_person_profile: false,
          site: SITE,
          form_id,
          source_surface: form_id,
          signup_page,
          utm_source: attribution.signup_utm_source || '',
          utm_medium: attribution.signup_utm_medium || '',
          utm_campaign: attribution.signup_utm_campaign || '',
          signup_referrer: attribution.signup_referrer || '',
          labelled,
          ...extraProperties,
        },
      }),
    });
  } catch (err) {
    console.warn(`submission-created: PostHog ${event} failed (non-fatal)`, err?.message);
  }
}

exports.handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body || '{}').payload || {};
  } catch (e) {
    console.error('submission-created: bad JSON body', e);
    return { statusCode: 200, body: 'ignored' };
  }

  if (payload.form_name !== 'pws-newsletter') {
    return { statusCode: 200, body: 'skip: wrong form' };
  }

  const data = payload.data || {};
  const attribution = buildAttribution(data, payload, event.headers || {});
  const email = (data.email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) {
    await capturePostHogEvent({
      event: 'Signup Failed',
      email: email || 'invalid',
      attribution,
      extraProperties: { reason: 'invalid_email' },
    });
    return { statusCode: 200, body: 'skip: no email' };
  }

  const source = (data.source || '').trim().slice(0, SOURCE_MAX_LENGTH);

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;

  if (!apiKey) {
    console.warn('submission-created: RESEND_API_KEY missing — signup not processed');
    await capturePostHogEvent({
      event: 'Signup Failed',
      email,
      attribution,
      extraProperties: { reason: 'resend_not_configured' },
    });
    return { statusCode: 200, body: 'skip: resend not configured' };
  }

  // Without a segment there is no contact record, and the automation has no
  // recipient to resolve against. Fail loudly rather than firing into a void.
  if (!segmentId) {
    console.error(
      'submission-created: RESEND_SEGMENT_ID missing — contact not created, welcome series NOT started',
    );
    await capturePostHogEvent({
      event: 'Signup Failed',
      email,
      attribution,
      extraProperties: { reason: 'no_segment_configured' },
    });
    return { statusCode: 200, body: 'skip: no segment configured' };
  }

  try {
    const { exists, properties: existingProperties } = await getExistingContact({
      apiKey,
      segmentId,
      email,
    });
    await addContactToSegment({ apiKey, segmentId, email });
    await patchContactAttribution({
      apiKey,
      email,
      existingProperties,
      attribution,
    });
    if (!exists) {
      await fireWelcomeEvent({ apiKey, email, source });
    }

    await capturePostHogEvent({
      event: 'Signup Confirmed',
      email,
      attribution,
      extraProperties: { is_new: !exists },
    });

    console.log(
      `submission-created: subscribed (is_new=${!exists}) for ${email} (source_surface=${attribution.source_surface})`,
    );
    return { statusCode: 200, body: 'sent' };
  } catch (err) {
    console.error('submission-created: Resend flow failed', err);
    await capturePostHogEvent({
      event: 'Signup Failed',
      email,
      attribution,
      extraProperties: { reason: 'resend_write_failed' },
    });
    return { statusCode: 500, body: `resend error: ${err.message}` };
  }
};

exports._internals = {
  buildAttribution,
  getExistingContact,
  addContactToSegment,
  patchContactAttribution,
  fireWelcomeEvent,
  capturePostHogEvent,
};
