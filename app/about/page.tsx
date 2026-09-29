import Image from "next/image";
import Link from "next/link";

// Placeholder About page — same stopgap approach as the homepage (see app/page.tsx):
// real NTO imagery/copy now, replaced by a Contentful Experience once Phase 4 lands.

const values = [
  {
    title: "Trail-tested, not lab-tested",
    body: "Every piece of gear we sell has logged real miles with the people who design it, before it ever reaches a shelf.",
  },
  {
    title: "Built for the long haul",
    body: "We design for durability first — gear that gets better with wear, not gear you replace every season.",
  },
  {
    title: "A community, not a catalog",
    body: "Our ambassadors and the Journal exist because the best gear recommendations come from people who actually use it.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-charcoal-950">
        <Image
          src="/images/home/four-campers.jpg"
          alt="Northern Trail Outfitters community around a campsite"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-charcoal-950/40" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Our story</h1>
          <p className="mt-4 text-lg text-charcoal-100">
            Northern Trail Outfitters started with a simple idea: gear should earn its place in
            your pack by working, not by looking good on a shelf.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-charcoal-800">
            From one trailhead to every trail
          </h2>
          <p className="mt-4 text-charcoal-600">
            NTO began as a small crew of hikers, riders, and campers who were tired of choosing
            between gear that performed and gear that lasted. We started building our own —
            technical apparel and equipment tested on real trails, in real weather, by the people
            who&apos;d actually be wearing it.
          </p>
          <p className="mt-4 text-charcoal-600">
            Today that same crew — now a network of ambassadors sharing their routes and reviews
            in the Journal — still shapes everything we make. If it doesn&apos;t hold up on their
            trips, it doesn&apos;t make it into your gear closet.
          </p>
          <Link
            href="/journal"
            className="mt-6 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800"
          >
            Read stories from the trail →
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/home/two-bikers.jpg"
            alt="Two riders on a gravel trail"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-charcoal-100">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-charcoal-800">
            What we stand for
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-charcoal-800">{value.title}</h3>
                <p className="text-sm text-charcoal-500">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-charcoal-800">
          Ready to gear up?
        </h2>
        <p className="mt-4 text-charcoal-500">
          Browse the collections our ambassadors helped shape.
        </p>
        <Link
          href="/gear"
          className="mt-8 inline-block rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-charcoal-950 transition-colors hover:bg-sky-400"
        >
          Shop the gear
        </Link>
      </section>
    </div>
  );
}
