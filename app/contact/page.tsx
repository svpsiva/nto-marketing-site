import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Northern Trail Outfitters.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-charcoal-800">Get in touch</h1>
      <p className="mt-2 text-charcoal-500">
        Questions about an order, a product, or anything else — send us a message and we&apos;ll reply as soon as we
        can.
      </p>

      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
