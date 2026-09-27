import {
  ContactMessage,
  contactEmailHtml,
  contactEmailSubject,
  contactEmailText,
} from '../templates/contact-email.js';

declare const process: { env: Record<string, string | undefined> };

const recipient = { name: 'Marco Figueroa', email: 'marco@figueroa-sanchez.com' };
const senderEmail = "contact@figueroa-sanchez.com"
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: object, status: number): Response => Response.json(body, { status });

const parse = (body: unknown): ContactMessage | null => {
  if (!body || typeof body !== 'object') return null;
  const { name, email, message } = body as Record<string, unknown>;
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return null;
  }
  const contact = { name: name.trim(), email: email.trim(), message: message.trim() };
  const isValid =
    contact.name.length > 0 &&
    contact.name.length <= 100 &&
    contact.email.length <= 200 &&
    emailPattern.test(contact.email) &&
    contact.message.length > 0 &&
    contact.message.length <= 5000;
  return isValid ? contact : null;
};

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env['BREVO_API_KEY'];
  if (!apiKey) {
    console.error('BREVO_API_KEY is not configured');
    return json({ error: 'The contact service is not available.' }, 500);
  }

  const contact = parse(await request.json().catch(() => null));
  if (!contact) {
    return json({ error: 'Please fill in all the fields with valid values.' }, 400);
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { name: 'Portfolio Contact', email: recipient.email },
      to: [recipient],
      replyTo: { name: contact.name, email: senderEmail},
      subject: contactEmailSubject(contact),
      htmlContent: contactEmailHtml(contact),
      textContent: contactEmailText(contact),
    }),
  });

  if (!response.ok) {
    console.error('Brevo error', response.status, await response.text());
    return json({ error: 'Failed to send the message. Please try again later.' }, 502);
  }

  return json({ message: "Message sent successfully! I'll get back to you soon." }, 200);
}
