// Curated NTO content, hand-picked from the real NTOSFRA catalog manifest
// (nto-brand-assets/nto-images/MANIFEST-catalog-original.csv) rather than the
// full ~2,700-image catalog. See the project plan for why: Contentful's free
// tier caps assets/records, and a brochure site doesn't need the full catalog.

export const PRODUCTS = [
  // Electronics
  {
    id: "product-contender-digital-sport-watch",
    csvGroup: "electronics/contender-digital-sport-watch-501000",
    slug: "contender-digital-sport-watch",
    name: "Contender Digital Sport Watch",
    tagline: "Rugged timekeeping for every summit.",
    category: "electronics",
    featured: true,
    specs: { water_resistance: "50m", battery_life: "12 months", display: "Digital LCD" },
    description: [
      "The Contender is built to take a beating and keep telling time. A shock-resistant case and 50m water resistance mean it shrugs off scrambles, river crossings, and everything in between.",
      "Simple, reliable, and legible at a glance — exactly what you want strapped to your wrist when the trail gets technical.",
    ],
  },
  {
    id: "product-etrex-20x-gps",
    csvGroup: "electronics/etrex-20x-gps-503200",
    slug: "etrex-20x-gps",
    name: "eTrex 20x GPS",
    tagline: "Pinpoint navigation, any terrain.",
    category: "electronics",
    featured: true,
    specs: { display: '2.2" color', battery_life: "25 hours", memory: "3.7GB internal" },
    description: [
      "A high-sensitivity receiver and 3.7GB of onboard memory let the eTrex 20x hold detailed topo maps for entire regions, no cell signal required.",
      "25 hours of battery life means it'll outlast your longest multi-day push.",
    ],
  },
  {
    id: "product-gpsmap-64s-gps",
    csvGroup: "electronics/gpsmap-64s-gps-503600",
    slug: "gpsmap-64s-gps",
    name: "GPSMAP 64s",
    tagline: "Backcountry-grade GPS mapping.",
    category: "electronics",
    featured: false,
    specs: { display: '2.6" color', connectivity: "Wireless data transfer", battery_life: "16 hours" },
    description: [
      "A bigger, brighter display and wireless data transfer make the GPSMAP 64s the pick for planning routes at home and following them precisely in the field.",
    ],
  },
  {
    id: "product-sport-pulse-wireless-earbuds",
    csvGroup: "electronics/sport-pulse-wireless-earbuds-502300",
    slug: "sport-pulse-wireless-earbuds",
    name: "Sport Pulse Wireless Earbuds",
    tagline: "Heart-rate tracking, trail-ready sound.",
    category: "electronics",
    featured: true,
    specs: { battery_life: "8 hours", water_resistance: "IPX7", connectivity: "Bluetooth 5.0" },
    description: [
      "Built-in heart-rate tracking and an IPX7 rating mean these earbuds are as comfortable on a sweaty climb as they are in a downpour.",
    ],
  },
  {
    id: "product-los-cabos-wireless-headphones",
    csvGroup: "electronics/los-cabos-wireless-headphones-502700",
    slug: "los-cabos-wireless-headphones",
    name: "Los Cabos Wireless Headphones",
    tagline: "All-day comfort for long hauls.",
    category: "electronics",
    featured: false,
    specs: { battery_life: "20 hours", connectivity: "Bluetooth 5.0", weight: "220g" },
    description: [
      "Plush ear cushions and 20 hours of playback make Los Cabos the pair you reach for on long drives to the trailhead and even longer days after.",
    ],
  },
  {
    id: "product-rino-650-gps-two-way-radio",
    csvGroup: "electronics/rino-650-gps-2-way-radio-503900",
    slug: "rino-650-gps-two-way-radio",
    name: "Rino 650 GPS 2-Way Radio",
    tagline: "Stay connected off the grid.",
    category: "electronics",
    featured: false,
    specs: { range: "20 miles", channels: "22 GMRS/FRS", battery_life: "18 hours" },
    description: [
      "Combine GPS tracking with a 20-mile-range two-way radio and you've got the whole group's location and comms handled in one device.",
    ],
  },

  // Gear
  {
    id: "product-abus-granit-x-plus-540-u-lock",
    csvGroup: "gear/abus-granit-x-plus-540-u-lock-5122617",
    slug: "abus-granit-x-plus-540-u-lock",
    name: "ABUS Granit X-Plus 540 U-Lock",
    tagline: "Maximum security, minimum weight.",
    category: "gear",
    featured: true,
    specs: { material: "Hardened steel", weight: "1.4kg", security_rating: "15/15" },
    description: [
      "A top security rating in a lock light enough to actually carry. The Granit X-Plus 540 is the lock you stop thinking about once it's on your bike.",
    ],
  },
  {
    id: "product-bontrager-flare-rt-rear-bike-light",
    csvGroup: "gear/bontrager-flare-rt-rear-bike-light-5123201",
    slug: "bontrager-flare-rt-rear-bike-light",
    name: "Bontrager Flare RT Rear Bike Light",
    tagline: "Be seen, day or night.",
    category: "gear",
    featured: true,
    specs: { visibility_range: "2km", battery_life: "16 hours", connectivity: "ANT+/Bluetooth" },
    description: [
      "Visible from up to 2km away, the Flare RT pairs to your bike computer over ANT+/Bluetooth so it automatically ramps up in low light.",
    ],
  },
  {
    id: "product-cateye-strada-slim-bike-computer",
    csvGroup: "gear/cateye-strada-slim-bike-computer-5123413",
    slug: "cateye-strada-slim-bike-computer",
    name: "CatEye Strada Slim Bike Computer",
    tagline: "Every mile, tracked.",
    category: "gear",
    featured: false,
    specs: { display: "LCD", functions: "Speed, distance, time", weight: "16g" },
    description: [
      "No app, no phone, no fuss — just speed, distance, and time, in a computer light enough to forget is even mounted.",
    ],
  },
  {
    id: "product-crankbrothers-m10-multi-tool",
    csvGroup: "gear/crankbrothers-m-10-multi-tool-5123341",
    slug: "crankbrothers-m10-multi-tool",
    name: "Crankbrothers M10 Multi-Tool",
    tagline: "Ten tools, one trail fix.",
    category: "gear",
    featured: false,
    specs: { tools: "10-in-1", material: "Chromoly steel", weight: "195g" },
    description: [
      "Ten of the most-needed trailside tools folded into one compact chromoly body — the difference between walking home and riding home.",
    ],
  },
  {
    id: "product-bontrager-dual-charger-floor-pump",
    csvGroup: "gear/bontrager-dual-charger-floor-pump-5123189",
    slug: "bontrager-dual-charger-floor-pump",
    name: "Bontrager Dual Charger Floor Pump",
    tagline: "Fast fills before the first climb.",
    category: "gear",
    featured: false,
    specs: { max_pressure: "160 psi", gauge: "Dual head", hose_length: "80cm" },
    description: [
      "A dual-head design fits presta and schrader without swapping parts, and 160psi max pressure covers everything from mountain to road.",
    ],
  },
  {
    id: "product-fox-head-purist-water-bottle",
    csvGroup: "gear/fox-head-purist-water-bottle---22-fl.-oz.-5122898",
    slug: "fox-head-purist-water-bottle",
    name: "Fox Head Purist Water Bottle",
    tagline: "Stay hydrated, mile after mile.",
    category: "gear",
    featured: false,
    specs: { capacity: "22 fl. oz.", material: "LDPE, BPA-free", care: "Dishwasher safe" },
    description: [
      "A BPA-free bottle that keeps flavor out and water tasting like water, no matter how many rides it's seen.",
    ],
  },

  // Women's apparel
  {
    id: "product-womens-denali-2-jacket",
    csvGroup: "women/women-s-denali-2-jacket-2010575",
    slug: "womens-denali-2-jacket",
    name: "Women's Denali 2 Jacket",
    tagline: "Warmth that moves with you.",
    category: "women",
    featured: true,
    specs: { material: "Recycled fleece", fit: "Athletic", care: "Machine wash cold" },
    description: [
      "A trail classic, updated. Recycled fleece and an athletic fit make the Denali 2 as comfortable on the summit as it is around town.",
    ],
  },
  {
    id: "product-womens-brooklyn-parka",
    csvGroup: "women/women-s-brooklyn-parka-2010262",
    slug: "womens-brooklyn-parka",
    name: "Women's Brooklyn Parka",
    tagline: "City-ready, storm-proof.",
    category: "women",
    featured: false,
    specs: { insulation: "600-fill down", shell: "Water-resistant nylon", length: "Hip-length" },
    description: [
      "600-fill down and a water-resistant shell make the Brooklyn Parka the layer you reach for the moment temperatures drop.",
    ],
  },
  {
    id: "product-womens-peak-bionic-2-jacket",
    csvGroup: "women/women-s-peak-bionic-2-jacket---updated-design-2010116",
    slug: "womens-peak-bionic-2-jacket",
    name: "Women's Peak Bionic 2 Jacket",
    tagline: "Built for the exposed ridgeline.",
    category: "women",
    featured: true,
    specs: { waterproofing: "2.5L waterproof shell", ventilation: "Pit zips", hood: "Adjustable, helmet-compatible" },
    description: [
      "A fully waterproof 2.5L shell with pit zips and a helmet-compatible hood — built for the days when the weather turns above treeline.",
    ],
  },
  {
    id: "product-jim-beanie",
    csvGroup: "women/jim-beanie-2040023",
    slug: "jim-beanie",
    name: "Jim Beanie",
    tagline: "Trail-tested warmth for your head.",
    category: "women",
    featured: false,
    specs: { material: "Merino wool blend", fit: "One size", care: "Hand wash" },
    description: [
      "A merino wool blend beanie that regulates temperature as well as it looks doing it.",
    ],
  },

  // Men's apparel
  {
    id: "product-patrol-balaclava",
    csvGroup: "men/patrol-balaclava-1040125",
    slug: "patrol-balaclava",
    name: "Patrol Balaclava",
    tagline: "Full coverage against the wind.",
    category: "men",
    featured: false,
    specs: { material: "Fleece-lined knit", fit: "One size", coverage: "Full face" },
    description: [
      "Fleece-lined and built for full coverage, the Patrol Balaclava is the last line of defense against wind-driven cold.",
    ],
  },
  {
    id: "product-underballa-balaclava",
    csvGroup: "men/underballa-balaclava-1040035",
    slug: "underballa-balaclava",
    name: "Underballa Balaclava",
    tagline: "Lightweight layer, serious warmth.",
    category: "men",
    featured: false,
    specs: { material: "Midweight knit", fit: "One size", coverage: "Full face" },
    description: [
      "Thin enough to layer under a helmet, warm enough that you'll forget it's there.",
    ],
  },
];

export const COLLECTIONS = [
  {
    id: "collection-electronics",
    slug: "trail-tech",
    name: "Trail Tech",
    description: "GPS units, watches, and audio built to survive the backcountry.",
    heroImageFile: "category-art/electronics-category-1680-400.jpg",
    productIds: PRODUCTS.filter((p) => p.category === "electronics").map((p) => p.id),
  },
  {
    id: "collection-gear",
    slug: "ride-and-gear",
    name: "Ride & Gear",
    description: "Locks, lights, tools, and hydration for the ride and beyond.",
    heroImageFile: "category-art/gear-category-1680-400.jpg",
    productIds: PRODUCTS.filter((p) => p.category === "gear").map((p) => p.id),
  },
  {
    id: "collection-women",
    slug: "womens-apparel",
    name: "Women's Apparel",
    description: "Jackets and layers engineered for cold mornings and long days out.",
    heroImageFile: "category-art/women-category-1680-400.jpg",
    productIds: PRODUCTS.filter((p) => p.category === "women").map((p) => p.id),
  },
  {
    id: "collection-men",
    slug: "mens-apparel",
    name: "Men's Apparel",
    description: "Essential cold-weather layers for the trail.",
    heroImageFile: "category-art/men-category-1680-400.jpg",
    productIds: PRODUCTS.filter((p) => p.category === "men").map((p) => p.id),
  },
];

export const AUTHORS = [
  {
    id: "author-aria-stone",
    name: "Aria Stone",
    bio: "Aria leads NTO's GPS and navigation testing program, logging over 200 days a year in the backcountry.",
    avatarFile: "category-art/aria-stone-profile.jpg",
  },
  {
    id: "author-finn-ryder",
    name: "Finn Ryder",
    bio: "Finn is an ultra-distance cyclist and NTO gear tester specializing in bikepacking setups.",
    avatarFile: "category-art/finn-ryder-profile.jpg",
  },
  {
    id: "author-omar-flint",
    name: "Omar Flint",
    bio: "Omar writes about layering systems and cold-weather apparel for NTO's Journal.",
    avatarFile: "category-art/omar-flint-profile.png",
  },
  {
    id: "author-maya-ridge",
    name: "Maya Ridge",
    bio: "Maya covers trail audio and electronics, testing gear from sea level to summit.",
    avatarFile: "category-art/maya-ridge-profile.png",
  },
  {
    id: "author-sasha-marlowe",
    name: "Sasha Marlowe",
    bio: "Sasha is a winter running specialist and longtime NTO ambassador.",
    avatarFile: "category-art/sasha-marlowe-profile.jpg",
  },
];

export const ARTICLES = [
  {
    id: "article-gps-before-the-climb",
    slug: "dialing-in-your-gps-before-the-big-climb",
    title: "Dialing In Your GPS Before the Big Climb",
    authorId: "author-aria-stone",
    heroImageFile: "category-art/stories-hero-01-800-600@2x.jpg",
    excerpt: "A few minutes of setup at the trailhead can save you hours of guesswork on the mountain.",
    tags: ["gps", "navigation", "electronics"],
    publishDate: "2026-03-02",
    body: [
      "Before you leave cell signal behind, take five minutes to load your route, set a few waypoints, and double-check your battery. It's the cheapest insurance you'll buy all season.",
      "The gear can only do so much — but paired with a little planning, a GPS unit turns 'I think this is the trail' into 'I know exactly where we are.'",
    ],
  },
  {
    id: "article-bikepacking-beginners-guide",
    slug: "two-wheels-no-excuses-a-beginners-guide-to-bikepacking",
    title: "Two Wheels, No Excuses: A Beginner's Guide to Bikepacking",
    authorId: "author-finn-ryder",
    heroImageFile: "category-art/stories-hero-02-800-600@2x.jpg",
    excerpt: "You don't need a garage full of gear to spend your first night out on two wheels.",
    tags: ["cycling", "bikepacking", "gear"],
    publishDate: "2026-04-10",
    body: [
      "Start small: one night, a route you already know, and just enough gear to be comfortable, not luxurious. The point is momentum, not perfection.",
      "A reliable lock, a light you trust, and a multi-tool that actually fits your bolts will solve 90% of the problems you'll run into on your first trip.",
    ],
  },
  {
    id: "article-layering-shoulder-season",
    slug: "layering-for-the-shoulder-season",
    title: "Layering for the Shoulder Season",
    authorId: "author-omar-flint",
    heroImageFile: "category-art/stories-hero-03-800-600@2x.jpg",
    excerpt: "The trickiest weather of the year deserves the smartest layering system.",
    tags: ["apparel", "layering"],
    publishDate: "2026-05-18",
    body: [
      "Shoulder season means one trailhead, three microclimates. The fix isn't a heavier jacket — it's a system you can add to and strip away as the day changes.",
      "Start with a wicking base layer, add insulation you can stuff in a pack, and finish with a shell that blocks wind without trapping heat.",
    ],
  },
  {
    id: "article-sound-on-the-summit",
    slug: "sound-on-the-summit-why-we-take-music-to-the-backcountry",
    title: "Sound On the Summit: Why We Take Music to the Backcountry",
    authorId: "author-maya-ridge",
    heroImageFile: "category-art/stories-hero-04-800-600.jpg",
    excerpt: "A good pair of earbuds changes the last exhausting mile into the best one.",
    tags: ["electronics", "audio"],
    publishDate: "2026-06-22",
    body: [
      "There's a stretch near the top of every long climb where your legs are done arguing and your playlist has to do the convincing. Bring gear that can keep up.",
    ],
  },
  {
    id: "article-winter-running-journal",
    slug: "cold-mornings-warm-miles-a-winter-running-journal",
    title: "Cold Mornings, Warm Miles: A Winter Running Journal",
    authorId: "author-sasha-marlowe",
    heroImageFile: "category-art/stories-hero-05-1800-600.jpg",
    excerpt: "Notes from a season of running before sunrise, in temperatures that don't care about your excuses.",
    tags: ["running", "winter", "apparel"],
    publishDate: "2026-07-30",
    body: [
      "The hardest part of a winter run is never the run — it's the ten minutes before, standing at the door deciding whether you actually meant it when you set the alarm.",
      "Dress for the mile you're in, not the mile you started. You'll warm up faster than you think, and overdressing costs you more than the cold does.",
    ],
  },
];

export const SITE_SETTINGS = {
  id: "site-settings",
  brandName: "Northern Trail Outfitters",
  tagline: "Outfitted for freedom.",
  logoFile: "homepage-logos-and-icons/logo.svg",
  nav: [
    { label: "Gear", href: "/gear" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { label: "Gear", href: "/gear" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};
