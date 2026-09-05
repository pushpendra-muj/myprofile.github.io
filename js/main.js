// ==========================================================================
// Portfolio interactions: theme toggle, mobile nav, scroll spy, reveal-in-view
// ==========================================================================

(function () {
  "use strict";

  var root = document.documentElement;
  var THEME_KEY = "ps-portfolio-theme";

  // ---------- Theme (light/dark) ----------
  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
  }

  function getPreferredTheme() {
    try {
      var stored = localStorage.getItem(THEME_KEY);
      if (stored === "dark" || stored === "light") return stored;
    } catch (e) { /* storage unavailable, fall through */ }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  applyTheme(getPreferredTheme());

  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  // ---------- Mobile nav ----------
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // ---------- Scroll spy ----------
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id], header[id]"));
  var navAnchors = navLinks ? Array.prototype.slice.call(navLinks.querySelectorAll("a")) : [];

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navAnchors.forEach(function (a) {
      var match = current && a.getAttribute("href") === "#" + current.id;
      a.classList.toggle("active", !!match);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  // ---------- Reveal on scroll ----------
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });

    // Safety net: if anything is still hidden after a couple of seconds
    // (e.g. a very fast anchor jump), reveal it anyway so content is
    // never permanently stuck invisible.
    window.setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    }, 2000);
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  // ---------- Footer year ----------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Repo link (best-effort: fill in from current GitHub Pages host) ----------
  var repoLink = document.getElementById("repoLink");
  if (repoLink) {
    var host = window.location.hostname; // e.g. username.github.io
    if (host.endsWith(".github.io")) {
      var user = host.split(".")[0];
      var path = window.location.pathname.split("/").filter(Boolean);
      var repo = path.length ? path[0] : (user + ".github.io");
      repoLink.href = "https://github.com/" + user + "/" + repo;
    } else {
      repoLink.style.display = "none";
    }
  }
})();
