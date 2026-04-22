// Netlify Forms event function — auto-invoked whenever a form submission is
// created on this site. We use it to send a welcome email via Mailgun the
// moment someone signs up through the EmailCapture component
// (form-name="pws-newsletter"). The hidden "source" field tells us which
// page captured them so we can tailor the first email.
//
// Docs: https://docs.netlify.com/forms/notifications/#email-from-a-function
//
// Required env vars (set in Netlify UI → Site settings → Environment):
//   MAILGUN_API_KEY     — Mailgun private API key
//   MAILGUN_DOMAIN      — Verified sending domain (e.g. mg.promptwritingstudio.com)
//   MAILGUN_REGION      — "eu" (default) or "us"
//   ALERT_FROM_EMAIL    — Verified sender (e.g. hello@promptwritingstudio.com)
//
// Returns 200 on success or skip; 500 only on hard send failure so Netlify
// will retry the webhook.

const SITE_URL = 'https://promptwritingstudio.com';

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
    <li><a href="${SITE_URL}/claude-code-skills" style="color:#1A1A1A;">Skills catalogue</a> — ${56} licence-verified skills you can copy into your own setup.</li>
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

async function sendViaMailgun({ apiKey, domain, region, from, to, subject, html }) {
  const host = region === 'us' ? 'api.mailgun.net' : 'api.eu.mailgun.net';
  const url = `https://${host}/v3/${domain}/messages`;

  const params = new URLSearchParams();
  params.append('from', from);
  params.append('to', to);
  params.append('subject', subject);
  params.append('html', html);
  params.append('o:tag', 'welcome');
  params.append('o:tracking', 'yes');

  const auth = Buffer.from(`api:${apiKey}`).toString('base64');

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Mailgun ${resp.status}: ${body}`);
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

  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const region = (process.env.MAILGUN_REGION || 'eu').toLowerCase();
  const from = process.env.ALERT_FROM_EMAIL || `PromptWritingStudio <hello@${domain || 'promptwritingstudio.com'}>`;

  if (!apiKey || !domain) {
    console.warn('submission-created: Mailgun env vars missing — welcome email skipped');
    return { statusCode: 200, body: 'skip: mailgun not configured' };
  }

  try {
    await sendViaMailgun({
      apiKey,
      domain,
      region,
      from,
      to: email,
      subject: 'Welcome to PromptWritingStudio',
      html: buildWelcomeHtml(email, source),
    });
    console.log(`submission-created: welcome email sent to ${email} (source=${source})`);
    return { statusCode: 200, body: 'sent' };
  } catch (err) {
    console.error('submission-created: Mailgun send failed', err);
    return { statusCode: 500, body: `mailgun error: ${err.message}` };
  }
};
