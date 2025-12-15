import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyRecaptcha(token) {
  if (!process.env.RECAPTCHA_SECRET) return false;
  try {
    const params = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET,
      response: token || '',
    });
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const json = await res.json();
    // v3: accept if success and score >= 0.5 (adjust as needed)
    return json.success && (json.score === undefined || json.score >= 0.5);
  } catch {
    return false;
  }
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const { firstName, lastName, email, message, company, website, recaptchaToken } = payload || {};

    // Required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    // Verify reCAPTCHA
    const captchaOk = await verifyRecaptcha(recaptchaToken);
    if (!captchaOk) {
      return NextResponse.json({ ok: false, error: 'Failed reCAPTCHA' }, { status: 400 });
    }

    const name = `${firstName} ${lastName}`;
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL,        // verified sender on Resend
      to: process.env.TO_EMAIL,
      subject: `New Heartcore Studio Inquiry from ${name}`,
      reply_to: email,
      text:
        `A new inquiry has been submitted:\n\n` +
        `Name: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\nWebsite: ${website || '-'}\n\n` +
        `Message:\n${message}`,
    });

    if (result?.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json({ ok: false, error: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact POST error:', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}