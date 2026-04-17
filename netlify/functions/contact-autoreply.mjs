const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://medxclaim.com';

const cors = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY is not set');
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { name, email } = body;

  if (!name || !email) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'name and email are required' }) };
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Invalid email address' }) };
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@medxclaim.com';
  const senderName = process.env.BREVO_SENDER_NAME || 'MedXClaim';
  const supportEmail = process.env.BREVO_SUPPORT_EMAIL || 'support@medxclaim.com';

  const firstName = String(name).trim().split(' ')[0];

  const payload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: String(email).trim(), name: String(name).trim() }],
    replyTo: { email: supportEmail, name: senderName },
    subject: `We received your message – ${senderName}`,
    htmlContent: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Message Received</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#1e293b;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">MedXClaim</h1>
              <p style="margin:8px 0 0;color:#bfdbfe;font-size:13px;">Medical Billing &amp; Revenue Cycle Management</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;color:#e2e8f0;font-size:16px;">Hi ${firstName},</p>
              <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">
                Thank you for reaching out! We've received your message and a member of our team will be in touch within <strong style="color:#60a5fa;">1–2 business days</strong>.
              </p>
              <p style="margin:0 0 24px;color:#cbd5e1;font-size:15px;line-height:1.6;">
                In the meantime, feel free to explore our services or reach us directly at
                <a href="mailto:${supportEmail}" style="color:#60a5fa;text-decoration:none;">${supportEmail}</a>.
              </p>
              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#2563eb,#7c3aed);border-radius:8px;">
                    <a href="https://medxclaim.com/services" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                      Explore Our Services
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#94a3b8;font-size:14px;line-height:1.6;">
                Best regards,<br/>
                <strong style="color:#e2e8f0;">The MedXClaim Team</strong>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0f172a;padding:24px 40px;text-align:center;border-top:1px solid #334155;">
              <p style="margin:0;color:#64748b;font-size:12px;">
                &copy; 2026 MedXClaim. All rights reserved.<br/>
                This email was sent because you submitted a contact form at medxclaim.com.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 201) {
      return { statusCode: 200, headers: cors, body: JSON.stringify({ success: true }) };
    }

    const errorText = await response.text();
    console.error(`Brevo API error ${response.status}:`, errorText);
    return {
      statusCode: 502,
      headers: cors,
      body: JSON.stringify({ error: 'Failed to send email', detail: response.status }),
    };
  } catch (err) {
    console.error('Brevo fetch error:', err);
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'Network error contacting email service' }) };
  }
};
