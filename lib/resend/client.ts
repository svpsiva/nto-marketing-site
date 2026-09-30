import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Resend's shared onboarding domain — swap for a verified sending domain
// (e.g. "NTO <hello@northerntrailoutfitters.com>") once one exists in Resend.
export const RESEND_FROM_ADDRESS = "NTO Marketing Site <onboarding@resend.dev>";
