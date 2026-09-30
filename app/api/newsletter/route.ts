import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend/client";

const payloadSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.error("Missing RESEND_AUDIENCE_ID env var — run `npm run setup:resend`.");
    return NextResponse.json({ error: "Newsletter signup is not configured." }, { status: 500 });
  }

  const { error } = await resend.contacts.create({
    email: parsed.data.email,
    segments: [{ id: audienceId }],
  });

  // Resend errors if the contact already exists for this segment — treat that as success.
  if (error && !error.message.toLowerCase().includes("already exists")) {
    console.error("Resend contact create failed:", error.message);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
