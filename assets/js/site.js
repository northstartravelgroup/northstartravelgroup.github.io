/* ==========================================================================
   NorthStar Travel Group — site behaviour
   Header/footer injection, navigation, scroll reveals, content rendering,
   and enquiry forms that hand off to WhatsApp or email.
   ========================================================================== */

(function () {
  "use strict";

  var B = window.NS.biz;
  var waBase = "https://wa.me/" + B.whatsapp;

  var NAV = [
    { label: "Packages", href: "packages.html" },
    { label: "Services", href: "services.html" },
    { label: "Gallery", href: "gallery.html" },
    { label: "Specials", href: "specials.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
  ];

  var MENU = NAV.concat([
    { label: "Book a trip", href: "book.html" },
    { label: "Payments", href: "payments.html" },
    { label: "Travel journal", href: "blog.html" },
    { label: "FAQ", href: "faq.html" },
  ]);

  /* compass star drawn inline so it sits transparently on the glass nav */
  var STAR_MARK =
    '<svg class="mark" viewBox="0 0 48 48" width="26" height="26" aria-hidden="true">' +
      '<defs><linearGradient id="nsg" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#fff3d0"/><stop offset="45%" stop-color="#f0d98a"/><stop offset="100%" stop-color="#a8811a"/>' +
      "</linearGradient></defs>" +
      '<circle cx="24" cy="24" r="20" fill="none" stroke="url(#nsg)" stroke-width="1" opacity=".55"/>' +
      '<path fill="url(#nsg)" d="M24 3l3.4 17.6L45 24l-17.6 3.4L24 45l-3.4-17.6L3 24l17.6-3.4z"/>' +
      '<path fill="url(#nsg)" opacity=".7" d="M34.6 13.4l-5.3 11.9-11.9 5.3 5.3-11.9z"/>' +
      '<path fill="url(#nsg)" opacity=".7" d="M13.4 13.4l11.9 5.3 5.3 11.9-11.9-5.3z"/>' +
    "</svg>";

  var ARROW = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11L11 3M11 3H5M11 3v6"/></svg>';
  var WA_ICON = '<svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.68-1.42 1.32-1.95 1.36-.5.05-.98.23-3.3-.69-2.77-1.09-4.53-3.92-4.67-4.1-.14-.18-1.12-1.48-1.12-2.83s.71-2.01.96-2.29c.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.6.62.48.24.55.8 1.9.87 2.04.07.14.12.3.02.48-.09.18-.14.29-.28.45-.14.16-.29.35-.42.47-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.32.07.12.07.66-.17 1.34z"/></svg>';

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function money(n) { return "R" + n.toLocaleString("en-ZA"); }
  function here() {
    var p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  /* ---- WhatsApp / mail helpers ---------------------------------------- */
  function waLink(msg) { return waBase + "?text=" + encodeURIComponent(msg); }
  function mailLink(subject, body) {
    return "mailto:" + B.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  /* ---- header ---------------------------------------------------------- */
  function buildHeader() {
    var cur = here();
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.href === cur ? ' aria-current="page"' : "") + ">" + n.label + "</a>";
    }).join("");

    var menuLinks = MENU.map(function (n, i) {
      return '<a class="menu-link" href="' + n.href + '" style="transition-delay:' + (60 + i * 45) + 'ms">' + n.label + "</a>";
    }).join("");

    var header = el(
      '<div class="nav-wrap" id="navWrap">' +
        '<nav class="nav" aria-label="Main">' +
          '<a class="nav-brand" href="index.html">' +
            STAR_MARK +
            "<span>NorthStar</span>" +
          "</a>" +
          '<div class="nav-links">' + links + "</div>" +
          '<a class="btn nav-cta" href="book.html">Enquire<span class="pip">' + ARROW + "</span></a>" +
          '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><i></i><i></i><i></i></button>' +
        "</nav>" +
      "</div>"
    );

    var overlay = el(
      '<div class="menu" id="menu">' +
        '<div class="shell menu-grid">' +
          "<div>" + menuLinks + "</div>" +
          '<div class="menu-side">' +
            '<p class="section-note">Speak to a consultant</p>' +
            '<p class="gold" style="font-family:var(--display);font-size:1.9rem;margin:.4rem 0 1rem">' + B.phoneDisplay + "</p>" +
            "<p>" + B.email + "</p>" +
            '<a class="btn btn-wa" href="' + waLink("Hi NorthStar, I'd like to plan a trip.") + '" target="_blank" rel="noopener">WhatsApp us<span class="pip">' + ARROW + "</span></a>" +
          "</div>" +
        "</div>" +
      "</div>"
    );

    document.body.prepend(overlay);
    document.body.prepend(header);

    var burger = document.getElementById("burger");
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    overlay.addEventListener("click", function (e) {
      if (e.target.classList.contains("menu-link") || e.target === overlay) {
        document.body.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") document.body.classList.remove("menu-open");
    });

    var wrap = document.getElementById("navWrap");
    var onScroll = function () { wrap.classList.toggle("compact", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- footer ---------------------------------------------------------- */
  function socialIcon(kind) {
    var paths = {
      facebook: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z",
      instagram: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.4A6.4 6.4 0 1018.4 12 6.4 6.4 0 0012 5.6zm0 10.6A4.2 4.2 0 1116.2 12 4.2 4.2 0 0112 16.2zm6.6-10.8a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z",
      tiktok: "M16.5 2h-3v13.2a2.6 2.6 0 11-2.2-2.6V9.5a5.9 5.9 0 105.2 5.8V9a7.3 7.3 0 004.1 1.3V7.2a4.2 4.2 0 01-4.1-4.2V2z",
      linkedin: "M6.2 8.5H3.4V21h2.8V8.5zM4.8 3a1.7 1.7 0 100 3.4A1.7 1.7 0 004.8 3zM21 13.8c0-3.2-1.7-4.7-4-4.7a3.4 3.4 0 00-3.1 1.7V8.5H11V21h2.9v-6.6c0-1.7.3-3.4 2.5-3.4s2.1 2 2.1 3.5V21H21v-7.2z",
    };
    return '<svg viewBox="0 0 24 24"><path d="' + paths[kind] + '"/></svg>';
  }

  function buildFooter() {
    var s = B.social;
    var socials = ["facebook", "instagram", "tiktok", "linkedin"].map(function (k) {
      return '<a href="' + (s[k] || "#") + '" aria-label="' + k + '"' + (s[k] ? ' target="_blank" rel="noopener"' : "") + ">" + socialIcon(k) + "</a>";
    }).join("");

    var hours = B.hours.map(function (h) {
      return "<li><span>" + h[0] + "</span> — <span class=\"gold\">" + h[1] + "</span></li>";
    }).join("");

    var footer = el(
      '<footer class="footer">' +
        '<div class="shell">' +
          '<div class="footer-grid">' +
            '<div class="footer-brand">' +
              '<img src="assets/img/logo.png" alt="' + B.name + '" width="200" height="147">' +
              "<p>Holidays, flights, transport and events across South Africa and beyond — planned properly, priced honestly.</p>" +
              '<div class="socials">' + socials + "</div>" +
            "</div>" +
            "<div>" +
              "<h5>Explore</h5>" +
              "<ul>" +
                '<li><a href="packages.html">Holiday packages</a></li>' +
                '<li><a href="services.html">All services</a></li>' +
                '<li><a href="specials.html">Special offers</a></li>' +
                '<li><a href="gallery.html">Gallery</a></li>' +
                '<li><a href="blog.html">Travel journal</a></li>' +
              "</ul>" +
            "</div>" +
            "<div>" +
              "<h5>Company</h5>" +
              "<ul>" +
                '<li><a href="about.html">About us</a></li>' +
                '<li><a href="faq.html">FAQ</a></li>' +
                '<li><a href="payments.html">Payments &amp; refunds</a></li>' +
                '<li><a href="terms.html">Terms &amp; privacy</a></li>' +
                '<li><a href="contact.html">Contact</a></li>' +
              "</ul>" +
            "</div>" +
            "<div>" +
              "<h5>Get in touch</h5>" +
              "<ul>" +
                '<li><a href="tel:' + B.phoneDial + '">' + B.phoneDisplay + "</a></li>" +
                '<li><a href="mailto:' + B.email + '">' + B.email + "</a></li>" +
                "<li>" + B.address + "</li>" +
              "</ul>" +
              '<h5 style="margin-top:1.8rem">Office hours</h5>' +
              '<ul style="font-size:.84rem;color:#b6afa2">' + hours + "</ul>" +
              '<h5 style="margin-top:1.8rem">Newsletter</h5>' +
              '<form class="newsletter" data-newsletter novalidate>' +
                '<input type="email" name="email" placeholder="Your email" aria-label="Email address" required>' +
                '<button class="btn" type="submit" aria-label="Subscribe"><span class="pip">' + ARROW + "</span></button>" +
              "</form>" +
            "</div>" +
          "</div>" +
          '<div class="footer-base">' +
            "<span>© <span data-year></span> " + B.name + (B.regNo ? " · Reg " + B.regNo : "") + ". All rights reserved.</span>" +
            '<span><a href="terms.html">Terms</a> · <a href="terms.html#privacy">Privacy &amp; POPIA</a> · <a href="terms.html#cookies">Cookies</a></span>' +
          "</div>" +
        "</div>" +
      "</footer>"
    );
    document.body.appendChild(footer);

    document.body.appendChild(el(
      '<a class="wa-float" href="' + waLink("Hi NorthStar, I'd like to enquire about a holiday.") + '" target="_blank" rel="noopener">' +
        '<span class="dot">' + WA_ICON + "</span><span>Chat to us</span>" +
      "</a>"
    ));

    document.querySelectorAll("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
  }

  /* ---- content renderers ---------------------------------------------- */
  function renderDestinations(node) {
    var limit = parseInt(node.dataset.limit || "99", 10);
    node.innerHTML = NS.destinations.slice(0, limit).map(function (d) {
      return (
        '<a class="shellcard tile ' + d.size + '" href="' + d.link + '" data-reveal>' +
          '<div class="core">' +
            '<img src="assets/img/' + d.img + '.jpg" alt="' + d.name + '" loading="lazy">' +
            '<div class="veil">' +
              '<span class="kicker">' + d.kicker + "</span>" +
              "<h3>" + d.name + "</h3>" +
              '<span class="from">from <b>' + money(d.from) + "</b> per person</span>" +
            "</div>" +
          "</div>" +
        "</a>"
      );
    }).join("");
  }

  function packageCard(p) {
    return (
      '<article class="shellcard pkg" id="' + p.id + '" data-reveal>' +
        '<div class="core">' +
          '<div class="pkg-media">' +
            '<span class="pkg-badge">' + p.badge + "</span>" +
            '<img src="assets/img/' + p.img + '.jpg" alt="' + p.name + '" loading="lazy">' +
          "</div>" +
          '<div class="pkg-body">' +
            "<h3>" + p.name + "</h3>" +
            '<div class="pkg-meta"><span>' + p.region + "</span><span>" + p.nights + " nights</span><span>" + p.dates + "</span></div>" +
            "<p>" + p.blurb + "</p>" +
            '<div class="chips">' + p.tags.map(function (t) { return '<span class="chip">' + t + "</span>"; }).join("") + "</div>" +
            '<details style="margin-top:.4rem">' +
              '<summary class="link-arrow" style="cursor:pointer;list-style:none">What\'s included</summary>' +
              '<div class="grid g2" style="margin-top:1rem;gap:1.2rem">' +
                '<div><p class="section-note" style="margin-bottom:.5rem">Included</p><ul style="margin:0;padding-left:1.1rem;font-size:.84rem;color:#cbc4b7">' +
                  p.includes.map(function (i) { return "<li>" + i + "</li>"; }).join("") +
                "</ul></div>" +
                '<div><p class="section-note" style="margin-bottom:.5rem">Excluded</p><ul style="margin:0;padding-left:1.1rem;font-size:.84rem;color:#8e877a">' +
                  p.excludes.map(function (i) { return "<li>" + i + "</li>"; }).join("") +
                "</ul></div>" +
              "</div>" +
            "</details>" +
            '<div class="pkg-price">' +
              '<span class="amount">' + money(p.price) + "</span>" +
              '<span class="unit">per person sharing</span>' +
            "</div>" +
            '<div class="btn-row" style="margin-top:.9rem">' +
              '<a class="btn" href="book.html?package=' + encodeURIComponent(p.name) + '">Book this trip<span class="pip">' + ARROW + "</span></a>" +
              '<a class="btn btn-ghost btn-wa-ghost" href="' + waLink("Hi NorthStar, I'm interested in the " + p.name + " package (" + money(p.price) + " pp). Please send me more detail.") + '" target="_blank" rel="noopener">WhatsApp<span class="pip">' + ARROW + "</span></a>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderPackages(node) {
    var limit = parseInt(node.dataset.limit || "99", 10);
    node.innerHTML = NS.packages.slice(0, limit).map(packageCard).join("");
  }

  function renderTestimonials(node) {
    var limit = parseInt(node.dataset.limit || "99", 10);
    node.innerHTML = NS.testimonials.slice(0, limit).map(function (t) {
      return (
        '<figure class="shellcard quote" data-reveal>' +
          '<div class="core">' +
            '<div class="stars">' + "★".repeat(t.stars) + "</div>" +
            "<blockquote>“" + t.quote + "”</blockquote>" +
            "<figcaption><b>" + t.name + "</b>" + t.where + "</figcaption>" +
          "</div>" +
        "</figure>"
      );
    }).join("");
  }

  function renderSpecials(node) {
    node.innerHTML = NS.specials.map(function (s, i) {
      return (
        '<article class="shellcard svc" data-reveal>' +
          '<div class="core">' +
            '<span class="pkg-badge" style="position:static;align-self:flex-start">' + s.tag + "</span>" +
            "<h3>" + s.title + "</h3>" +
            "<p>" + s.detail + "</p>" +
            '<p class="section-note" style="margin-top:auto">Valid until ' + s.until + "</p>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  function renderPosts(node) {
    var limit = parseInt(node.dataset.limit || "99", 10);
    node.innerHTML = NS.posts.slice(0, limit).map(function (p) {
      return (
        '<a class="shellcard post" href="' + p.url + '" data-reveal>' +
          '<div class="core">' +
            '<div class="post-media"><img src="assets/img/' + p.img + '.jpg" alt="" loading="lazy"></div>' +
            '<div class="post-body">' +
              '<span class="post-date">' + p.date + "</span>" +
              "<h3>" + p.title + "</h3>" +
              "<p>" + p.excerpt + "</p>" +
              '<span class="link-arrow" style="margin-top:auto">Read ' + ARROW + "</span>" +
            "</div>" +
          "</div>" +
        "</a>"
      );
    }).join("");
  }

  function fillPackageSelect(sel) {
    var opts = ['<option value="">Not sure yet — advise me</option>'];
    NS.packages.forEach(function (p) { opts.push('<option value="' + p.name + '">' + p.name + "</option>"); });
    ["Flights only", "Accommodation only", "Transport / shuttle", "Event package", "Honeymoon", "Corporate travel", "Other"].forEach(function (o) {
      opts.push('<option value="' + o + '">' + o + "</option>");
    });
    sel.innerHTML = opts.join("");
    var pre = new URLSearchParams(location.search).get("package");
    if (pre) sel.value = pre;
  }

  /* ---- toast ----------------------------------------------------------- */
  var toastNode;
  function toast(msg) {
    if (!toastNode) {
      toastNode = el('<div class="toast" role="status"></div>');
      document.body.appendChild(toastNode);
    }
    toastNode.textContent = msg;
    toastNode.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastNode.classList.remove("show"); }, 5200);
  }

  /* ---- enquiry form ---------------------------------------------------- */
  function wireForm(form) {
    var fields = form.querySelectorAll("input, select, textarea");

    function validate() {
      var ok = true;
      fields.forEach(function (f) {
        var wrap = f.closest(".field");
        if (!wrap) return;
        var bad = f.hasAttribute("required") && !f.value.trim();
        if (!bad && f.type === "email" && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value)) bad = true;
        wrap.classList.toggle("invalid", bad);
        if (bad) ok = false;
      });
      return ok;
    }

    function compose() {
      var d = {};
      fields.forEach(function (f) {
        if (!f.name) return;
        /* for selects, send the readable label rather than an empty value */
        d[f.name] = f.tagName === "SELECT" && f.selectedIndex > -1
          ? f.options[f.selectedIndex].text.trim()
          : f.value.trim();
      });
      var lines = [
        "*New enquiry — NorthStar Travel Group*",
        "",
        "Name: " + (d.name || "-"),
        "Phone: " + (d.phone || "-"),
        "Email: " + (d.email || "-"),
        "Destination / package: " + (d.destination || "-"),
        "Departure: " + (d.depart || "-"),
        "Return: " + (d.ret || "-"),
        "Travellers: " + (d.adults || "0") + " adult(s), " + (d.children || "0") + " child(ren)",
        "Budget: " + (d.budget || "-"),
        "",
        "Special requests:",
        d.notes || "(none)",
      ];
      return { text: lines.join("\n"), name: d.name || "there" };
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) { toast("Please complete the highlighted fields."); return; }
      var msg = compose();
      var mode = (e.submitter && e.submitter.dataset.send) || "whatsapp";
      var url = mode === "email"
        ? mailLink("Travel enquiry — " + msg.name, msg.text.replace(/\*/g, ""))
        : waLink(msg.text);
      window.open(url, mode === "email" ? "_self" : "_blank");
      toast("Thanks " + msg.name + " — your enquiry is opening now. Send it and we'll reply within one working day.");
      form.reset();
    });

    fields.forEach(function (f) {
      f.addEventListener("input", function () {
        var wrap = f.closest(".field");
        if (wrap && wrap.classList.contains("invalid")) validate();
      });
    });
  }

  function wireNewsletter(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value)) { toast("Please enter a valid email address."); return; }
      window.open(mailLink("Newsletter signup", "Please add this address to the NorthStar mailing list: " + input.value), "_self");
      toast("Thanks! Send the email that just opened and you're on the list.");
      form.reset();
    });
  }

  /* ---- scroll reveal --------------------------------------------------- */
  function observeReveals(root) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = Number(entry.target.dataset.revealIndex || 0);
        entry.target.style.transitionDelay = Math.min(idx * 70, 420) + "ms";
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    (root || document).querySelectorAll("[data-reveal]:not(.in)").forEach(function (node, i) {
      if (!node.dataset.revealIndex) {
        var sibs = Array.prototype.filter.call(node.parentElement.children, function (c) { return c.hasAttribute("data-reveal"); });
        node.dataset.revealIndex = String(sibs.indexOf(node));
      }
      io.observe(node);
    });
  }

  /* ---- boot ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();

    var map = {
      "destinations": renderDestinations,
      "packages": renderPackages,
      "testimonials": renderTestimonials,
      "specials": renderSpecials,
      "posts": renderPosts,
    };
    document.querySelectorAll("[data-render]").forEach(function (node) {
      var fn = map[node.dataset.render];
      if (fn) fn(node);
    });

    document.querySelectorAll("[data-package-select]").forEach(fillPackageSelect);
    document.querySelectorAll("[data-enquiry]").forEach(wireForm);

    buildFooter();
    document.querySelectorAll("[data-newsletter]").forEach(wireNewsletter);

    /* fill in contact details wherever they're referenced in markup */
    document.querySelectorAll("[data-biz]").forEach(function (n) {
      var k = n.dataset.biz;
      if (k === "phone") { n.textContent = B.phoneDisplay; if (n.tagName === "A") n.href = "tel:" + B.phoneDial; }
      if (k === "email") { n.textContent = B.email; if (n.tagName === "A") n.href = "mailto:" + B.email; }
      if (k === "address") n.textContent = B.address;
      if (k === "wa") n.href = waLink("Hi NorthStar, I'd like to enquire about a holiday.");
    });

    observeReveals();

    if (window.GLightbox) {
      window.GLightbox({ selector: ".gallery a", touchNavigation: true, loop: true, openEffect: "fade", closeEffect: "fade" });
    }
  });
})();
