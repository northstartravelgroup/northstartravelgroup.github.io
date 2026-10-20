# NorthStar Travel Group — website

A static marketing site for NorthStar Travel Group (Pty) Ltd. No build step, no framework,
no server. Plain HTML, one stylesheet, two small scripts. Open `index.html` and it works.

---

## Run it locally

```bash
python3 -m http.server 8899
# then open http://localhost:8899
```

(Opening the files directly with `file://` also works, but a server is closer to production.)

---

## Deploy it

Any static host. All three of these are free and give you HTTPS automatically:

**Netlify (easiest)** — drag the whole folder onto <https://app.netlify.com/drop>. Done.

**Vercel** — `npx vercel` in this folder, or connect the repo at <https://vercel.com>.

**GitHub Pages** — push to GitHub, then Settings → Pages → deploy from `main` / root.

Afterwards, point the domain at the host and update `sitemap.xml`, `robots.txt` and the
`<link rel="canonical">` in `index.html` if the domain isn't `northstartravelgroup.co.za`.

---

## Editing content

**Almost everything lives in `assets/js/data.js`.** Open it in any text editor, change the
text between the quotes, save, refresh the browser. That file controls:

| What | Variable |
|---|---|
| Phone, WhatsApp, email, address, hours, social links | `NS.biz` |
| The 8 holiday packages — prices, nights, inclusions, dates | `NS.packages` |
| The destination tiles on the home page | `NS.destinations` |
| Customer testimonials | `NS.testimonials` |
| Special offers | `NS.specials` |
| Blog post cards | `NS.posts` |

Adding a package: copy an existing block in `NS.packages`, change the values, and put a photo
named to match `img:` into `assets/img/`. It appears on the home page and packages page
automatically — no HTML editing.

Page text (headings, About, FAQ answers, terms) is edited directly in the relevant `.html` file.

---

## Files

```
index.html              Home
packages.html           All 8 packages (rendered from data.js)
services.html           The 18 services
gallery.html            Lightbox gallery (GLightbox)
specials.html           Current offers
about.html              Story, mission, vision, values
book.html               Enquiry form → WhatsApp or email
payments.html           Deposits, payment plans, refunds, cancellation scale
faq.html                10 questions (with FAQ schema for Google)
terms.html              Booking terms, liability, privacy/POPIA, cookies
blog.html               Journal index
blog-*.html             Three articles
contact.html            Contact details, hours, Google map
404.html                Not-found page
robots.txt / sitemap.xml
assets/css/style.css    The entire design system
assets/js/data.js       ← all content lives here
assets/js/site.js       Header, footer, nav, reveals, forms
assets/img/             Photography + logo
CREDITS.md              Photo licences
TODO-FOR-CLIENT.md      ← what NorthStar still needs to supply
```

---

## How the enquiry form works

There is no server, so nothing is stored. On submit the form builds a formatted message and
opens either **WhatsApp** (pre-filled, the traveller just presses send) or the traveller's
**email app**, addressed to NorthStar. This is deliberate: it costs nothing, it can't break,
and it lands the enquiry where a small agency actually answers — WhatsApp.

The trade-off: the traveller must press send in the app that opens. If the business later
wants enquiries captured in a database, see §6 of `TODO-FOR-CLIENT.md`.

---

## Design notes

- **Palette** — black `#060505` with gold `#c9a227` / `#f0d98a`, taken from the logo.
- **Type** — Cormorant Garamond (display, matches the logo's serif) + Plus Jakarta Sans (text).
- **Motion** — `IntersectionObserver` fade-ups; no scroll listeners driving animation. Everything
  animates on `transform` / `opacity` only. Respects `prefers-reduced-motion`.
- **Dependencies** — Google Fonts, and GLightbox (gallery page only). Nothing else.
- **Accessibility** — semantic landmarks, focus-visible inputs, `aria-current` nav state, alt
  text on content images, keyboard-dismissible menu.

Browser support: current Chrome, Safari, Firefox and Edge, mobile and desktop.
