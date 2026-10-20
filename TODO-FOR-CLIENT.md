# What NorthStar must supply before this site goes live

Everything below is either a **placeholder** or an **assumption I made** so the site could be
finished. Nothing here is broken — it just needs the real thing swapped in.

Most of it is changed in **one file**: `assets/js/data.js`.

---

## 1. Must fix before launch (legal / factual)

| # | Item | Where | Currently |
|---|---|---|---|
| 1 | **Company registration number** | `assets/js/data.js` → `regNo` | Empty (hidden from footer until filled in) |
| 2 | **Physical / postal address** | `assets/js/data.js` → `address` | "Johannesburg, Gauteng, South Africa" — a guess |
| 3 | **Operating hours** | `assets/js/data.js` → `hours` | Mon–Fri 08:00–17:00, Sat 09:00–13:00, Sun WhatsApp only — a guess |
| 4 | **Social media links** | `assets/js/data.js` → `social` | Empty — icons currently link nowhere |
| 5 | **All package prices** | `assets/js/data.js` → `NS.packages` | **Sample data.** Every price, inclusion, exclusion and date is invented |
| 6 | **All testimonials** | `assets/js/data.js` → `NS.testimonials` | **Invented.** Replace with real reviews, and get written permission first |
| 7 | **All special offers** | `assets/js/data.js` → `NS.specials` | **Invented** |
| 8 | **All photographs** | `assets/img/` | Free stock (Wikimedia / Openverse) — see `CREDITS.md` |
| 9 | **Terms & privacy page** | `terms.html` | Plain-language draft. Have an attorney check it before trading |
| 10 | **Cancellation / refund scale** | `payments.html` | A sensible industry-standard scale — confirm it's what NorthStar actually applies |

> ⚠️ Points 5, 6 and 7 matter most. Advertising a price you can't honour, or a review that
> wasn't given, is a Consumer Protection Act problem. Replace them before you share the link.

---

## 2. Assumptions I made (change if wrong)

- **Slogan:** "Find your true north." — used on the About page. Change in `data.js` → `slogan`.
- **Deposit:** R500 per person. Appears on the home page, packages page and payments page.
- **Balance due:** 45 days before flight packages, 21 days before local trips.
- **Group discount:** every 11th traveller free on coach tours; 10+ qualifies for group rates.
- **Founded:** 2024 ("South African owned · Since 2024" on the home page hero — `index.html`).
- **Quote turnaround:** one working day. This is promised in several places — make sure it's real.
- **Domain:** `northstartravelgroup.co.za` is used in the sitemap, robots.txt and canonical tag.
  If the real domain differs, update `robots.txt`, `sitemap.xml` and the `<link rel="canonical">`
  in `index.html`.

---

## 3. Photographs

Every photo is a licensed placeholder — free for commercial use, credited in `CREDITS.md`.
They're good enough to launch with, but **client photos will convert far better.**

Ask NorthStar for:
- Real travellers on real trips (with their permission to publish)
- The coaches / vehicles used
- Hotel and lodge rooms actually booked
- Event nights
- A photo of the owner / team for the About page — people book people

To replace one: save the new photo over the old filename in `assets/img/`, same name, done.
Keep them under ~400 KB each. Sizes used: hero 2000px wide, cards 1200–1400px.

---

## 4. Things that need an account somewhere

| Feature | What's needed |
|---|---|
| **Newsletter signup** | Currently opens an email to NorthStar. For a real list, sign up for Mailchimp/Brevo (free tiers) and paste their form code into the footer in `assets/js/site.js` |
| **Google Analytics** | Create a GA4 property, then paste the snippet before `</head>` on every page (see §5) |
| **Facebook Pixel** | Only needed if he runs Facebook/Instagram ads. Same place as GA |
| **Google Business Profile** | Free, and the single highest-value SEO action for a local travel agent. Do this first |
| **Google Reviews** | Once the Business Profile exists, its review link can replace the testimonials section |
| **SSL certificate** | Free and automatic on Netlify, Vercel and GitHub Pages |

---

## 5. Analytics snippet (paste when he has the IDs)

Add this immediately before `</head>` in **every** `.html` file, replacing `G-XXXXXXX`:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

---

## 6. Nice-to-have next (not built)

These were on the original brief but need a backend / database, which this build deliberately
doesn't have:

- **Admin panel** — add packages, change prices, upload posters, view bookings and enquiries,
  publish blog posts, send newsletters. This needs a database and a login. The current site is
  built so that this can be added later without redesigning anything: all content already lives
  in one structured file (`data.js`) that a database would simply replace.
- **Bookings stored in a database** — enquiries currently arrive on WhatsApp and by email, which
  works well for a small agency and costs nothing.
- **Online payment** — deposits are currently paid by EFT against an invoice.

When he wants these, the natural next step is Supabase (free tier) plus a simple admin page.
