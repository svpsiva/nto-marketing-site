import { NextResponse } from "next/server";
import { z } from "zod";
import { resend, RESEND_FROM_ADDRESS } from "@/lib/resend/client";

const payloadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().email(),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Fill in your name, email, and message." }, { status: 400 });
  }

  const contactInbox = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!contactInbox) {
    console.error("Missing CONTACT_NOTIFICATION_EMAIL env var.");
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  const { name, email, message } = parsed.data;

  const { error } = await resend.emails.send({
    from: RESEND_FROM_ADDRESS,
    to: contactInbox,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("Resend email send failed:", error.message);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
