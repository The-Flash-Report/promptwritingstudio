// Netlify Forms event function — auto-invoked whenever a form submission is
// created on this site. When someone signs up through the EmailCapture
// component (form-name="pws-newsletter"), we:
//   1. add them as a contact to the PromptWritingStudio Resend segment, and
//   2. fire the `promptwritingstudio.welcome` event, which starts the
//      "PromptWritingStudio — Welcome Series" automation in Resend.
// The hidden "source" field tells us which surface captured them (homepage /
// footer / popup / a specific page) so we can tailor and measure.
//
// WHY AN EVENT AND NOT AN INLINE EMAIL (changed 2026-07-21): this function used
// to render and send a single welcome email itself. Two problems. It could only
// ever be one email, so there was no way to follow up. And a raw /emails send
// carries no subscription state, so its footer said "Reply to unsubscribe" —
// which is not an unsubscribe mechanism, it is a request that somebody reads
// the inbox. Sending through an automation means Resend owns the list state and
// {{{RESEND_UNSUBSCRIBE_URL}}} in the templates resolves to a real one-click
// unsubscribe.
//
// Docs: https://docs.netlify.com/forms/notifications/#email-from-a-function
//
// Required env vars (set in Netlify UI → Site settings → Environment):
//   RESEND_API_KEY      — Resend API key (secret; set via `netlify env:set --secret`)
//   RESEND_SEGMENT_ID   — Resend audience/segment id for PromptWritingStudio
// Optional:
//   RESEND_WELCOME_EVENT — automation trigger name.
//                          Defaults to "promptwritingstudio.welcome".
//
// The submission is always stored in Netlify Forms regardless, so that stays
// the durable record. Returns 200 on success or skip; 500 only on a hard
// failure, so Netlify retries the webhook.

const RESEND_API = 'https://api.resend.com';
const WELCOME_EVENT =
  process.env.RESEND_WELCOME_EVENT || 'promptwritingstudio.welcome';
const SOURCE_MAX_LENGTH = 120;

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
    const body = await resp.text();
    // 409 / "already exists" is expected on re-submit — not an error.
    console.warn(`submission-created: add-contact ${resp.status}: ${body}`);
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
  const email = (data.email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) {
    return { statusCode: 200, body: 'skip: no email' };
  }

  const source = (data.source || '').trim().slice(0, SOURCE_MAX_LENGTH);

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;

  if (!apiKey) {
    console.warn('submission-created: RESEND_API_KEY missing — signup not processed');
    return { statusCode: 200, body: 'skip: resend not configured' };
  }

  // Without a segment there is no contact record, and the automation has no
  // recipient to resolve against. Fail loudly rather than firing into a void.
  if (!segmentId) {
    console.error(
      'submission-created: RESEND_SEGMENT_ID missing — contact not created, welcome series NOT started',
    );
    return { statusCode: 200, body: 'skip: no segment configured' };
  }

  try {
    await addContactToSegment({ apiKey, segmentId, email });
    await fireWelcomeEvent({ apiKey, email, source });

    console.log(
      `submission-created: subscribed + welcome series started for ${email} (source=${source})`,
    );
    return { statusCode: 200, body: 'sent' };
  } catch (err) {
    console.error('submission-created: Resend flow failed', err);
    return { statusCode: 500, body: `resend error: ${err.message}` };
  }
};
