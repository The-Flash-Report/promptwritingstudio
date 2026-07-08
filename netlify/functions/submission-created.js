// Netlify Forms event function — auto-invoked whenever a form submission is
// created on this site. When someone signs up through the EmailCapture
// component (form-name="pws-newsletter"), we:
//   1. add them as a contact to the PromptWritingStudio Resend segment, and
//   2. send a welcome email via Resend.
// The hidden "source" field tells us which surface captured them (homepage /
// footer / popup / a specific page) so we can tailor and measure.
//
// Docs: https://docs.netlify.com/forms/notifications/#email-from-a-function
//
// Required env vars (set in Netlify UI → Site settings → Environment):
//   RESEND_API_KEY      — Resend API key (secret; set via `netlify env:set --secret`)
//   RESEND_SEGMENT_ID   — Resend audience/segment id for PromptWritingStudio
//   RESEND_FROM         — Verified sender, e.g.
//                         "PromptWritingStudio <hello@send.promptwritingstudio.com>"
//
// Returns 200 on success or skip; 500 only on hard send failure so Netlify
// will retry the webhook.

const SITE_URL = 'https://promptwritingstudio.com';
const RESEND_API = 'https://api.resend.com';

function buildWelcomeHtml(email, source) {
  const sourceNote = source
    ? `You signed up from <strong>${source.replace(/[^a-z0-9:_\-\/]/gi, '')}</strong>.`
    : '';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1A1A1A;">
  <h2 style="margin:0 0 8px;font-size:20px;">You're on the PromptWritingStudio list</h2>
  <p style="color:#555;font-size:14px;margin:0 0 16px;">
    Thanks for subscribing. You'll get a short email when there's a new
    Claude Code skill worth installing, a new guide worth reading, or a
    tool worth trying. No hype, no spam.
  </p>
  <p style="font-size:14px;line-height:1.55;">
    Some starting points while you wait:
  </p>
  <ul style="font-size:14px;line-height:1.6;color:#333;">
    <li><a href="${SITE_URL}/claude-code-guide" style="color:#1A1A1A;">Claude Code guide</a> — the end-to-end walkthrough.</li>
    <li><a href="${SITE_URL}/prompt-grader" style="color:#1A1A1A;">Prompt Grader</a> — paste a prompt, get a scored critique and a rewrite.</li>
    <li><a href="${SITE_URL}/claude-code-mcp-stack" style="color:#1A1A1A;">Minimum viable MCP stack</a> — the 5 servers worth the context tokens.</li>
  </ul>
  <p style="margin-top:24px;font-size:12px;color:#888;">
    ${sourceNote}
    You're receiving this because <strong>${email}</strong> was used to subscribe at
    <a href="${SITE_URL}" style="color:#555;">promptwritingstudio.com</a>.
    Reply to unsubscribe.
  </p>
</body>
</html>`;
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
    const body = await resp.text();
    // 409 / "already exists" is expected on re-submit — not an error.
    console.warn(`submission-created: add-contact ${resp.status}: ${body}`);
  }
}

async function sendWelcome({ apiKey, from, to, subject, html }) {
  const resp = await fetch(`${RESEND_API}/emails`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html, tags: [{ name: 'type', value: 'welcome' }] }),
  });

  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Resend ${resp.status}: ${body}`);
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

  const source = (data.source || '').trim().slice(0, 120);

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  const from =
    process.env.RESEND_FROM ||
    'PromptWritingStudio <hello@send.promptwritingstudio.com>';

  if (!apiKey) {
    console.warn('submission-created: RESEND_API_KEY missing — signup not processed');
    return { statusCode: 200, body: 'skip: resend not configured' };
  }

  try {
    if (segmentId) {
      await addContactToSegment({ apiKey, segmentId, email });
    } else {
      console.warn('submission-created: RESEND_SEGMENT_ID missing — contact not added to segment');
    }

    await sendWelcome({
      apiKey,
      from,
      to: email,
      subject: 'Welcome to PromptWritingStudio',
      html: buildWelcomeHtml(email, source),
    });

    console.log(`submission-created: subscribed + welcomed ${email} (source=${source})`);
    return { statusCode: 200, body: 'sent' };
  } catch (err) {
    console.error('submission-created: Resend flow failed', err);
    return { statusCode: 500, body: `resend error: ${err.message}` };
  }
};
