import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistPayload = {
  email?: unknown;
  role?: unknown;
  project?: unknown;
  footage?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: WaitlistPayload;

  try {
    body = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const email = asTrimmedString(body.email);
  const role = asTrimmedString(body.role);
  const project = asTrimmedString(body.project);
  const footage = asTrimmedString(body.footage);

  if (!email) {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 },
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.WAITLIST_TO_EMAIL;
  const fromEmail = process.env.WAITLIST_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Waitlist email is not configured. Missing one of RESEND_API_KEY, WAITLIST_TO_EMAIL, WAITLIST_FROM_EMAIL.",
    );
    return NextResponse.json(
      { error: "Unable to submit your request right now. Please try again later." },
      { status: 500 },
    );
  }

  const submittedAt = new Date().toISOString();
  const notProvided = "(not provided)";

  const text = [
    `Email: ${email}`,
    `Role: ${role || notProvided}`,
    `What they are trying to cut: ${project || notProvided}`,
    `How many hours of footage they are sitting on: ${footage || notProvided}`,
    `Submitted at: ${submittedAt}`,
  ].join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 16px;">New First Cut access request</h2>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 0 0 8px;"><strong>Role:</strong> ${escapeHtml(role) || notProvided}</p>
      <p style="margin: 0 0 8px;"><strong>What they are trying to cut:</strong> ${escapeHtml(project) || notProvided}</p>
      <p style="margin: 0 0 8px;"><strong>How many hours of footage they are sitting on:</strong> ${escapeHtml(footage) || notProvided}</p>
      <p style="margin: 16px 0 0; color: #666; font-size: 13px;"><strong>Submitted at:</strong> ${submittedAt}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: "New First Cut access request",
      text,
      html,
    });

    if (error) {
      console.error("Resend failed to send waitlist email:", error);
      return NextResponse.json(
        { error: "Unable to submit your request right now. Please try again later." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Unexpected error sending waitlist email:", err);
    return NextResponse.json(
      { error: "Unable to submit your request right now. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
