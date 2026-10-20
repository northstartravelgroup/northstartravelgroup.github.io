/* ==========================================================================
   NorthStar Travel Group — site content
   -------------------------------------------------------------------------
   THIS IS THE FILE TO EDIT when packages, prices or specials change.
   Nothing else needs touching. Save the file, refresh the site, done.
   ⚠️  All prices below are SAMPLE DATA — replace with real quotes.
   ========================================================================== */

window.NS = window.NS || {};

/* ---- business details -------------------------------------------------- */
NS.biz = {
  name: "NorthStar Travel Group (Pty) Ltd",
  short: "NorthStar Travel Group",
  slogan: "Find your true north.",
  phoneDisplay: "082 500 2003",
  phoneDial: "+27825002003",
  whatsapp: "27825002003",              // international format, no + or spaces
  email: "singwane2004@gmail.com",
  address: "Johannesburg, Gauteng, South Africa",   // TODO: confirm street address
  hours: [
    ["Monday – Friday", "08:00 – 17:00"],
    ["Saturday", "09:00 – 13:00"],
    ["Sunday & public holidays", "WhatsApp only"],
  ],
  regNo: "",                            // TODO: add company registration number
  social: {
    facebook: "",                       // TODO: paste page URL
    instagram: "",                      // TODO
    tiktok: "",                         // TODO
    linkedin: "",                       // TODO
  },
};

/* ---- holiday packages -------------------------------------------------- */
/* price = per person sharing, in ZAR. img = file in assets/img/            */
NS.packages = [
  {
    id: "durban",
    name: "Durban Golden Mile",
    region: "South Africa",
    img: "durban",
    badge: "Best seller",
    nights: 4,
    price: 4850,
    blurb: "Warm Indian Ocean, uShaka Marine World and the beachfront promenade — the easiest family escape on the calendar.",
    dates: "Departures every Friday, year-round",
    includes: ["Return luxury coach transport", "4 nights beachfront hotel, bed & breakfast", "uShaka Marine World entry", "Guided city and Valley of a Thousand Hills tour", "Tour host throughout"],
    excludes: ["Lunches and dinners", "Personal spending money", "Optional activities", "Travel insurance"],
    tags: ["Family", "Beach", "Coach tour"],
  },
  {
    id: "cape-town",
    name: "Cape Town & the Winelands",
    region: "South Africa",
    img: "capetown",
    badge: "Signature",
    nights: 5,
    price: 12400,
    blurb: "Table Mountain, Camps Bay sunsets, Cape Point and a full day tasting through Stellenbosch and Franschhoek.",
    dates: "Monthly departures — Mar, Jun, Sep, Dec",
    includes: ["Return flights from OR Tambo", "5 nights 4★ city hotel, breakfast daily", "Table Mountain cableway ticket", "Cape Peninsula full-day tour", "Winelands tasting day with lunch", "All airport transfers"],
    excludes: ["Dinners", "Robben Island ferry", "Travel insurance", "Personal spending"],
    tags: ["Couples", "Flights", "Wine"],
  },
  {
    id: "sun-city",
    name: "Sun City Weekend",
    region: "South Africa",
    img: "suncity",
    badge: "Weekend",
    nights: 2,
    price: 3950,
    blurb: "Valley of Waves, the Lost City and a casino floor — two nights of pure resort indulgence, two hours from Joburg.",
    dates: "Every second weekend",
    includes: ["Return transport from Johannesburg", "2 nights resort accommodation", "Valley of Waves day passes", "Welcome dinner", "Resort access wristbands"],
    excludes: ["Casino chips", "Spa treatments", "Additional meals", "Travel insurance"],
    tags: ["Weekend", "Resort", "Groups"],
  },
  {
    id: "kruger",
    name: "Kruger Big Five Safari",
    region: "South Africa",
    img: "kruger",
    badge: "Bucket list",
    nights: 3,
    price: 9600,
    blurb: "Open-vehicle game drives at sunrise and sunset, a bush braai under the stars, and every chance at all five.",
    dates: "Weekly departures, April – October",
    includes: ["Return transport from Johannesburg", "3 nights lodge accommodation", "All meals", "4 open-vehicle game drives", "Park conservation fees", "Qualified field guide"],
    excludes: ["Drinks", "Gratuities", "Curio purchases", "Travel insurance"],
    tags: ["Safari", "All meals", "Guided"],
  },
  {
    id: "mozambique",
    name: "Mozambique Beach Escape",
    region: "Southern Africa",
    img: "mozambique",
    badge: "Island time",
    nights: 5,
    price: 14200,
    blurb: "Ponta do Ouro and the Bazaruto blue — snorkelling, seafood and hammocks strung between palms.",
    dates: "Departures in April, July and December",
    includes: ["Return flights or 4x4 transfer", "5 nights beach resort, half board", "Snorkelling excursion", "Border and park fees", "All ground transfers"],
    excludes: ["Visa fees where applicable", "Diving courses", "Alcoholic drinks", "Travel insurance"],
    tags: ["Beach", "Honeymoon", "Snorkelling"],
  },
  {
    id: "victoria-falls",
    name: "Victoria Falls, Zimbabwe",
    region: "Southern Africa",
    img: "zimbabwe",
    badge: "Wonder",
    nights: 3,
    price: 15800,
    blurb: "Stand at the edge of the smoke that thunders, then drift down the Zambezi as the sun drops behind the gorge.",
    dates: "Monthly departures — best May to September",
    includes: ["Return flights to Victoria Falls", "3 nights hotel, breakfast daily", "Guided tour of the Falls with rain ponchos", "Sunset Zambezi cruise with drinks", "All transfers"],
    excludes: ["Zimbabwe visa (payable on arrival)", "Adventure activities", "Lunches and dinners", "Travel insurance"],
    tags: ["Flights", "Wonder", "Cruise"],
  },
  {
    id: "botswana",
    name: "Okavango Delta, Botswana",
    region: "Southern Africa",
    img: "botswana",
    badge: "Wilderness",
    nights: 4,
    price: 21500,
    blurb: "Glide through the delta by mokoro, walk the islands with a guide, and sleep where there are no roads at all.",
    dates: "May – September (high-water season)",
    includes: ["Return flights to Maun", "Light aircraft transfer into the delta", "4 nights camp accommodation, all meals", "Mokoro excursions and guided bush walks", "Park fees"],
    excludes: ["Premium drinks", "Gratuities", "Travel insurance", "Curios"],
    tags: ["Luxury", "Safari", "Fly-in"],
  },
  {
    id: "garden-route",
    name: "Garden Route Road Trip",
    region: "South Africa",
    img: "gardenroute",
    badge: "Self-drive",
    nights: 6,
    price: 11750,
    blurb: "Chapman's Peak to Tsitsikamma — six nights, one car, and the finest stretch of coastal road in the country.",
    dates: "Any date — fully flexible self-drive",
    includes: ["Group B car rental with unlimited km", "6 nights guesthouse accommodation, breakfast daily", "Detailed route itinerary and maps", "Tsitsikamma park entry", "24/7 support line"],
    excludes: ["Fuel and tolls", "Meals other than breakfast", "Car rental excess waiver", "Travel insurance"],
    tags: ["Self-drive", "Couples", "Coastal"],
  },
];

/* ---- destinations shown in the bento grid ------------------------------ */
NS.destinations = [
  { name: "Cape Town", img: "capetown", kicker: "Western Cape", from: 12400, size: "b-hero", link: "packages.html#cape-town" },
  { name: "Durban", img: "durban", kicker: "KwaZulu-Natal", from: 4850, size: "b-wide", link: "packages.html#durban" },
  { name: "Kruger Park", img: "kruger", kicker: "Mpumalanga", from: 9600, size: "", link: "packages.html#kruger" },
  { name: "Sun City", img: "suncity", kicker: "North West", from: 3950, size: "", link: "packages.html#sun-city" },
  { name: "Mozambique", img: "mozambique", kicker: "Indian Ocean", from: 14200, size: "", link: "packages.html#mozambique" },
  { name: "Victoria Falls", img: "zimbabwe", kicker: "Zimbabwe", from: 15800, size: "", link: "packages.html#victoria-falls" },
  { name: "Okavango Delta", img: "botswana", kicker: "Botswana", from: 21500, size: "b-wide", link: "packages.html#botswana" },
];

/* ---- testimonials ------------------------------------------------------ */
/* TODO: replace with real reviews (ask clients for permission first).      */
NS.testimonials = [
  { stars: 5, quote: "They planned our whole Cape Town trip in two days. Flights, hotel, the wine tour — everything was booked and we just packed.", name: "Thandeka M.", where: "Cape Town package · March" },
  { stars: 5, quote: "We paid off our Durban holiday over four months. No stress, no interest, and the kids still talk about uShaka.", name: "Sipho & Naledi K.", where: "Durban Golden Mile · December" },
  { stars: 5, quote: "The Kruger guide found us all of the Big Five in two days. The lodge, the food, the bush braai — worth every rand.", name: "Reneilwe P.", where: "Kruger Big Five · July" },
  { stars: 5, quote: "Our company sent twenty-two staff to Sun City and NorthStar handled every single booking without one hiccup.", name: "M. Dlamini", where: "Corporate group · September" },
];

/* ---- special offers ---------------------------------------------------- */
NS.specials = [
  { title: "Early Bird — December Coast", detail: "Book any Durban or Mozambique package before 30 September and save 15% on the per-person rate.", tag: "Save 15%", until: "30 September" },
  { title: "Student Rate", detail: "Valid student card holders travel on Sun City and Durban weekend packages at a reduced group rate.", tag: "Students", until: "Year-round" },
  { title: "Group of 10+", detail: "Every eleventh traveller goes free on coach packages — perfect for churches, stokvels and school groups.", tag: "11th free", until: "Year-round" },
  { title: "Black Friday Week", detail: "Deposits from R500 on every 2027 package, plus free airport transfers on all flight holidays.", tag: "Big one", until: "Late November" },
];

/* ---- blog posts -------------------------------------------------------- */
NS.posts = [
  { title: "What to pack for a Kruger safari", date: "12 August 2026", img: "kruger", excerpt: "Neutral colours, warm layers for the morning drive, and the one thing everybody forgets.", url: "blog-packing-safari.html" },
  { title: "How South Africans can pay off a holiday monthly", date: "28 July 2026", img: "mozambique", excerpt: "Deposits, payment plans and how to budget a beach holiday over four pay cheques.", url: "blog-pay-monthly.html" },
  { title: "Visa guide: Zimbabwe, Botswana & Mozambique", date: "9 July 2026", img: "zimbabwe", excerpt: "What South African passport holders need at each border, and what it costs.", url: "blog-visa-guide.html" },
];
