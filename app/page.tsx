import Image from "next/image";
import Link from "next/link";

// Placeholder home page. Per the project plan, `/` will be served by the
// Contentful Experiences catch-all route once Experiences is wired up (Phase 4),
// letting editors compose this page visually. Until then, this static page
// gives the skeleton real NTO content/imagery instead of Next.js boilerplate.

const featureBlocks = [
  {
    image: "/images/home/content-one.jpg",
    title: "Built for the trail",
    body: "Technical apparel and gear engineered for cold mornings, long climbs, and everything in between.",
  },
  {
    image: "/images/home/content-two.jpg",
    title: "Ride, hike, camp, repeat",
    body: "From singletrack to summit, NTO gear moves with you across every season and every terrain.",
  },
  {
    image: "/images/home/content-three.jpg",
    title: "Gear that lasts",
    body: "Durable materials and considered design, made to be broken in — not broken down.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-charcoal-950">
        <Image
          src="/images/home/nto360-hero-poster.jpg"
          alt="Northern Trail Outfitters — outdoor lifestyle"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-charcoal-950/40" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Outfitted for freedom.
          </h1>
          <p className="mt-4 text-lg text-charcoal-100 sm:text-xl">
            Gear and apparel for the outdoor lifestyle — built for the trail, the summit, and
            everywhere beyond.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/gear"
              className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-charcoal-950 transition-colors hover:bg-sky-400"
            >
              Shop the gear
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 sm:grid-cols-3">
          {featureBlocks.map((block) => (
            <div key={block.title} className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={block.image} alt={block.title} fill className="object-cover" />
              </div>
              <h2 className="text-lg font-semibold text-charcoal-800">{block.title}</h2>
              <p className="text-sm text-charcoal-500">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal-100">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/home/Outfitted_for_Freedom.jpg"
              alt="Outfitted for freedom"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-charcoal-800">
              Outfitted for freedom
            </h2>
            <p className="mt-4 text-charcoal-600">
              Northern Trail Outfitters exists for the people who&apos;d rather be outside. We
              design gear that disappears on the trail — so you can focus on the miles, the
              climb, and the view at the top.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              Learn more about NTO →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
