/**
 * renderer.js - Dynamic HTML rendering from config.json
 * Namespace: window.Portfolio.Renderer
 *
 * All accent colors use theme-aware CSS classes (.text-theme, .btn-theme, etc.)
 * so each page gets its own palette automatically via CSS variables.
 */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};

  var r = function (obj) { return window.Portfolio.I18n.resolve(obj); };

  /* ---- SVG Icons ---- */
  var ICONS = {
    api: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    automation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><path d="M12 6V2m0 20v-4m6-6h4M2 12h4m13.07-5.07l2.83-2.83M2.1 21.9l2.83-2.83m14.14 0l2.83 2.83M2.1 2.1l2.83 2.83"/><circle cx="12" cy="12" r="4"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>',
    devops: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>',
    devto: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6v4.36h.58c.37 0 .65-.08.84-.23.2-.16.3-.46.3-.91v-2.07c0-.45-.1-.76-.3-.92zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-1.94.77H4.38V8.55h2.28c.87 0 1.46.2 1.9.79.44.58.41 1.12.41 2.78v.59c0 1.7.04 2.01-.41 2.59zm4.75-5.37H11.1v2.26h1.42v1.32H11.1v2.26h2.21v1.32H10.2c-.57 0-.87-.3-.87-.87V9.11c0-.57.3-.87.87-.87h3.11v1.69zm5.55 5.77c-.49.79-1.26 1.07-1.94.71-.51-.27-.7-.73-.84-1.32l-1.01-4.79h-.07l-1.01 4.79c-.13.59-.33 1.05-.84 1.32-.68.36-1.45.08-1.94-.71L8.32 8.55h1.74l1.66 5.71h.07l.96-5.71h1.67l.96 5.71h.07l1.66-5.71H18.85l-1.99 7.15z"/></svg>',
    arrow_up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M18 15l-6-6-6 6"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  };

  function icon(name) {
    return ICONS[name] || '';
  }

  /* ---- Index Page Sections ---- */

  function renderHero(data) {
    var el = document.querySelector('[data-section="hero"]');
    if (!el || !data) return;
    el.innerHTML =
      '<div class="hero-gradient absolute inset-0"></div>' +
      '<div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[85vh] py-20">' +
        '<div class="flex-1 text-center md:text-left">' +
          '<p class="text-theme text-lg mb-2 animate-on-scroll">' + r(data.greeting) + '</p>' +
          '<h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 animate-on-scroll">' + data.name + '</h1>' +
          '<p class="text-xl sm:text-2xl text-gray-300 mb-6 animate-on-scroll">' + r(data.role) + '</p>' +
          '<p class="text-gray-400 max-w-lg mb-8 animate-on-scroll">' + r(data.subtitle) + '</p>' +
          '<a href="' + data.ctaLink + '" class="btn-theme inline-block px-8 py-3 font-semibold rounded-lg animate-on-scroll">' + r(data.cta) + '</a>' +
        '</div>' +
        '<div class="flex-shrink-0 animate-on-scroll scale-in">' +
          '<div class="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-theme-soft img-placeholder">' +
            '<img src="' + data.portrait + '" alt="Joshua" class="w-full h-full object-cover" onerror="Portfolio.Utils.handleImageError(this)">' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderAbout(data) {
    var el = document.querySelector('[data-section="about"]');
    if (!el || !data) return;
    var paragraphs = '';
    for (var i = 0; i < data.paragraphs.length; i++) {
      paragraphs += '<p class="text-gray-300 leading-relaxed mb-4 animate-on-scroll">' + r(data.paragraphs[i]) + '</p>';
    }
    el.innerHTML =
      '<div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-8 animate-on-scroll">' + r(data.title) + '</h2>' +
        paragraphs +
      '</div>';
  }

  function renderTechStack(data) {
    var el = document.querySelector('[data-section="techStack"]');
    if (!el || !data) return;
    var categories = '';
    for (var c = 0; c < data.categories.length; c++) {
      var cat = data.categories[c];
      var items = '';
      for (var i = 0; i < cat.items.length; i++) {
        var tech = cat.items[i];
        items +=
          '<div class="tech-card hover-border-theme flex flex-col items-center gap-3 p-5 rounded-xl border border-gray-800 animate-on-scroll">' +
            '<div class="w-12 h-12 flex items-center justify-center">' +
              '<img src="' + tech.icon + '" alt="' + tech.name + '" class="w-10 h-10 object-contain" onerror="this.style.display=\'none\';this.parentNode.innerHTML=\'<div class=\\\'tech-card-fallback\\\'>' + tech.name.charAt(0) + '</div>\'">' +
            '</div>' +
            '<span class="text-sm font-medium text-gray-300">' + tech.name + '</span>' +
          '</div>';
      }
      categories +=
        '<div class="mb-10 animate-on-scroll">' +
          '<h3 class="text-xl font-semibold text-theme mb-6">' + r(cat.name) + '</h3>' +
          '<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 stagger-children">' + items + '</div>' +
        '</div>';
    }
    el.innerHTML =
      '<div class="max-w-5xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-10 animate-on-scroll">' + r(data.title) + '</h2>' +
        categories +
      '</div>';
  }

  function renderSkills(data) {
    var el = document.querySelector('[data-section="skills"]');
    if (!el || !data) return;
    var cards = '';
    for (var i = 0; i < data.items.length; i++) {
      var s = data.items[i];
      cards +=
        '<div class="p-6 rounded-xl border border-gray-800 hover-border-theme animate-on-scroll">' +
          '<div class="skill-icon mb-4">' + icon(s.icon) + '</div>' +
          '<h3 class="text-lg font-semibold text-white mb-2">' + r(s.title) + '</h3>' +
          '<p class="text-gray-400 text-sm leading-relaxed">' + r(s.description) + '</p>' +
        '</div>';
    }
    el.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-10 animate-on-scroll">' + r(data.title) + '</h2>' +
        '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">' + cards + '</div>' +
      '</div>';
  }

  function renderDifferentiator(data) {
    var el = document.querySelector('[data-section="differentiator"]');
    if (!el || !data) return;
    var items = '';
    for (var i = 0; i < data.items.length; i++) {
      items += '<li class="diff-item flex items-start text-gray-300 text-lg animate-on-scroll">' + r(data.items[i]) + '</li>';
    }
    el.innerHTML =
      '<div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-8 animate-on-scroll">' + r(data.title) + '</h2>' +
        '<ul class="space-y-4 stagger-children">' + items + '</ul>' +
      '</div>';
  }

  function renderProjects(data) {
    var el = document.querySelector('[data-section="projects"]');
    if (!el || !data) return;
    var cards = '';
    for (var i = 0; i < data.items.length; i++) {
      var p = data.items[i];
      var tags = '';
      for (var t = 0; t < p.tags.length; t++) {
        tags += '<span class="tag">' + p.tags[t] + '</span>';
      }
      cards +=
        '<a href="' + p.link + '" class="project-card block animate-on-scroll">' +
          '<div class="aspect-video img-placeholder">' +
            '<img src="' + p.thumbnail + '" alt="' + p.title + '" class="w-full h-full object-cover" onerror="Portfolio.Utils.handleImageError(this)">' +
          '</div>' +
          '<div class="p-6">' +
            '<h3 class="text-xl font-bold text-white mb-2">' + p.title + '</h3>' +
            '<p class="text-gray-400 text-sm mb-4">' + r(p.description) + '</p>' +
            '<div class="flex flex-wrap gap-2">' + tags + '</div>' +
          '</div>' +
        '</a>';
    }
    el.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-2 animate-on-scroll">' + r(data.title) + '</h2>' +
        '<p class="text-gray-400 mb-10 animate-on-scroll">' + r(data.subtitle) + '</p>' +
        '<div class="grid md:grid-cols-2 gap-8 stagger-children">' + cards + '</div>' +
      '</div>';
  }

  function renderContact(data) {
    var el = document.querySelector('[data-section="contact"]');
    if (!el || !data) return;
    var links = '';
    for (var i = 0; i < data.links.length; i++) {
      var l = data.links[i];
      links +=
        '<a href="' + l.url + '" target="_blank" rel="noopener noreferrer" class="contact-link animate-on-scroll"' +
        (l.type === 'email' ? '' : ' target="_blank"') + '>' +
          '<span class="text-theme">' + icon(l.type) + '</span>' +
          '<span class="text-gray-300">' + l.label + '</span>' +
        '</a>';
    }
    el.innerHTML =
      '<div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-2 animate-on-scroll">' + r(data.title) + '</h2>' +
        '<p class="text-gray-400 mb-10 animate-on-scroll">' + r(data.subtitle) + '</p>' +
        '<div class="grid sm:grid-cols-2 gap-4 stagger-children">' + links + '</div>' +
      '</div>';
  }

  /* ---- City Page Sections ---- */

  function renderCityHero(data) {
    var el = document.querySelector('[data-section="hero"]');
    if (!el || !data) return;
    el.innerHTML =
      '<div class="hero-gradient-city absolute inset-0"></div>' +
      '<div class="relative z-10 flex flex-col items-center justify-end min-h-[70vh] pb-16 px-4 text-center">' +
        '<h1 class="text-5xl sm:text-7xl font-bold text-white mb-4 animate-on-scroll">' + data.title + '</h1>' +
        '<p class="text-xl sm:text-2xl text-gray-300 animate-on-scroll">' + r(data.subtitle) + '</p>' +
      '</div>';
    el.style.backgroundImage = 'url(' + data.bg + ')';
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
  }

  function renderHistory(data) {
    var el = document.querySelector('[data-section="history"]');
    if (!el || !data) return;
    var paragraphs = '';
    for (var i = 0; i < data.paragraphs.length; i++) {
      paragraphs += '<p class="text-gray-300 leading-relaxed mb-4 animate-on-scroll">' + r(data.paragraphs[i]) + '</p>';
    }
    el.innerHTML =
      '<div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-8 animate-on-scroll">' + r(data.title) + '</h2>' +
        paragraphs +
      '</div>';
  }

  function renderAttractions(data) {
    var el = document.querySelector('[data-section="attractions"]');
    if (!el || !data) return;
    var cards = '';
    for (var i = 0; i < data.items.length; i++) {
      var a = data.items[i];
      cards +=
        '<div class="attraction-card animate-on-scroll">' +
          '<div class="aspect-video img-placeholder">' +
            '<img src="' + a.image + '" alt="' + r(a.name) + '" class="w-full h-full object-cover" onerror="Portfolio.Utils.handleImageError(this)">' +
          '</div>' +
          '<div class="p-6">' +
            '<h3 class="text-lg font-semibold text-white mb-2">' + r(a.name) + '</h3>' +
            '<p class="text-gray-400 text-sm">' + r(a.description) + '</p>' +
          '</div>' +
        '</div>';
    }
    el.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-10 animate-on-scroll">' + r(data.title) + '</h2>' +
        '<div class="grid md:grid-cols-3 gap-6 stagger-children">' + cards + '</div>' +
      '</div>';
  }

  function renderCulture(data) {
    var el = document.querySelector('[data-section="culture"]');
    if (!el || !data) return;
    var paragraphs = '';
    for (var i = 0; i < data.paragraphs.length; i++) {
      paragraphs += '<p class="text-gray-300 leading-relaxed mb-4 animate-on-scroll">' + r(data.paragraphs[i]) + '</p>';
    }
    el.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">' +
        '<div class="grid md:grid-cols-2 gap-10 items-center">' +
          '<div>' +
            '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-8 animate-on-scroll">' + r(data.title) + '</h2>' +
            paragraphs +
          '</div>' +
          '<div class="aspect-video rounded-xl overflow-hidden img-placeholder animate-on-scroll slide-left">' +
            '<img src="' + data.image + '" alt="' + r(data.title) + '" class="w-full h-full object-cover" onerror="Portfolio.Utils.handleImageError(this)">' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderGastronomy(data) {
    var el = document.querySelector('[data-section="gastronomy"]');
    if (!el || !data) return;
    var items = '';
    for (var i = 0; i < data.items.length; i++) {
      var g = data.items[i];
      items +=
        '<div class="gastro-card animate-on-scroll">' +
          '<h3 class="text-lg font-semibold text-white mb-2">' + r(g.name) + '</h3>' +
          '<p class="text-gray-400 text-sm">' + r(g.description) + '</p>' +
        '</div>';
    }
    el.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 animate-on-scroll">' + r(data.title) + '</h2>' +
        '<p class="text-gray-400 mb-10 animate-on-scroll">' + r(data.description) + '</p>' +
        '<div class="grid sm:grid-cols-3 gap-6 stagger-children">' + items + '</div>' +
      '</div>';
  }

  function renderLandmarks(data) {
    var el = document.querySelector('[data-section="landmarks"]');
    if (!el || !data) return;
    var cards = '';
    for (var i = 0; i < data.items.length; i++) {
      var l = data.items[i];
      cards +=
        '<div class="attraction-card animate-on-scroll">' +
          '<div class="aspect-video img-placeholder">' +
            '<img src="' + l.image + '" alt="' + r(l.name) + '" class="w-full h-full object-cover" onerror="Portfolio.Utils.handleImageError(this)">' +
          '</div>' +
          '<div class="p-6">' +
            '<h3 class="text-lg font-semibold text-white mb-2">' + r(l.name) + '</h3>' +
            '<p class="text-gray-400 text-sm">' + r(l.description) + '</p>' +
          '</div>' +
        '</div>';
    }
    el.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-10 animate-on-scroll">' + r(data.title) + '</h2>' +
        '<div class="grid md:grid-cols-3 gap-6 stagger-children">' + cards + '</div>' +
      '</div>';
  }

  function renderGallery(data) {
    var el = document.querySelector('[data-section="gallery"]');
    if (!el || !data) return;
    var items = '';
    for (var i = 0; i < data.items.length; i++) {
      var g = data.items[i];
      items +=
        '<div class="gallery-item animate-on-scroll">' +
          '<img src="' + g.src + '" alt="' + r(g.alt) + '" class="w-full h-full object-cover" onerror="Portfolio.Utils.handleImageError(this)">' +
        '</div>';
    }
    el.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">' +
        '<h2 class="text-3xl sm:text-4xl font-bold text-white mb-10 animate-on-scroll">' + r(data.title) + '</h2>' +
        '<div class="gallery-grid stagger-children">' + items + '</div>' +
      '</div>';
  }

  function renderPromo(data) {
    var el = document.querySelector('[data-section="promo"]');
    if (!el || !data) return;
    el.innerHTML =
      '<div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">' +
        '<div class="promo-section p-10 text-center animate-on-scroll scale-in">' +
          '<h2 class="text-3xl font-bold text-white mb-4">' + r(data.title) + '</h2>' +
          '<p class="text-gray-300 text-lg">' + r(data.text) + '</p>' +
        '</div>' +
      '</div>';
  }

  /* ---- Shared: Navbar & Footer ---- */

  function renderNavbar(globalData, page) {
    var el = document.querySelector('[data-section="navbar"]');
    if (!el || !globalData) return;

    var navItems = '';
    if (page === 'index') {
      var navKeys = ['about', 'tech', 'skills', 'projects', 'contact'];
      var sectionIds = ['about', 'techStack', 'skills', 'projects', 'contact'];
      for (var i = 0; i < navKeys.length; i++) {
        navItems +=
          '<a href="#' + sectionIds[i] + '" class="nav-link text-gray-300 hover:text-white transition-colors text-sm" data-nav="' + sectionIds[i] + '">' +
            r(globalData.nav[navKeys[i]]) +
          '</a>';
      }
    } else {
      navItems =
        '<a href="./index.html" class="text-gray-300 hover:text-white transition-colors text-sm">' +
          r(globalData.backToPortfolio) +
        '</a>';
    }

    var mobileItems = '';
    if (page === 'index') {
      var navKeys2 = ['about', 'tech', 'skills', 'projects', 'contact'];
      var sectionIds2 = ['about', 'techStack', 'skills', 'projects', 'contact'];
      for (var j = 0; j < navKeys2.length; j++) {
        mobileItems +=
          '<a href="#' + sectionIds2[j] + '" class="mobile-nav-link block py-2 text-gray-300 hover:text-white transition-colors" data-nav="' + sectionIds2[j] + '">' +
            r(globalData.nav[navKeys2[j]]) +
          '</a>';
      }
    } else {
      mobileItems =
        '<a href="./index.html" class="block py-2 text-gray-300 hover:text-white transition-colors">' +
          r(globalData.backToPortfolio) +
        '</a>';
    }

    el.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">' +
        '<a href="./index.html" class="text-xl font-bold text-white">' + globalData.siteName + '</a>' +
        '<div class="hidden md:flex items-center gap-6">' +
          navItems +
          '<button class="lang-toggle" onclick="Portfolio.I18n.toggle()" aria-label="' + r(globalData.langToggle.ariaLabel) + '">' +
            r(globalData.langToggle.label) +
          '</button>' +
        '</div>' +
        '<div class="flex md:hidden items-center gap-4">' +
          '<button class="lang-toggle" onclick="Portfolio.I18n.toggle()" aria-label="' + r(globalData.langToggle.ariaLabel) + '">' +
            r(globalData.langToggle.label) +
          '</button>' +
          '<button class="hamburger flex flex-col gap-1.5 p-2" aria-label="Menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="mobile-menu md:hidden px-4 pb-4">' +
        mobileItems +
      '</div>';
  }

  function renderFooter(globalData) {
    var el = document.querySelector('[data-section="footer"]');
    if (!el || !globalData) return;
    var year = new Date().getFullYear();
    el.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center">' +
        '<p class="text-gray-500 text-sm">' +
          r(globalData.footer.text) + ' <span class="text-white font-semibold">' + globalData.siteName + '</span>' +
        '</p>' +
        '<p class="text-gray-600 text-xs mt-2">&copy; ' + year + ' ' + r(globalData.footer.rights) + '</p>' +
      '</div>';
  }

  /* ---- Main render entry point ---- */

  function renderPage(config, page) {
    var globalData = config.global;
    renderNavbar(globalData, page);

    if (page === 'index') {
      var d = config.index;
      renderHero(d.hero);
      renderAbout(d.about);
      renderTechStack(d.techStack);
      renderSkills(d.skills);
      renderDifferentiator(d.differentiator);
      renderProjects(d.projects);
      renderContact(d.contact);
    } else if (page === 'tampico') {
      var t = config.tampico;
      renderCityHero(t.hero);
      renderHistory(t.history);
      renderAttractions(t.attractions);
      renderGallery(t.gallery);
      renderPromo(t.promo);
    } else if (page === 'veracruz') {
      var v = config.veracruz;
      renderCityHero(v.hero);
      renderCulture(v.culture);
      renderGastronomy(v.gastronomy);
      renderLandmarks(v.landmarks);
      renderGallery(v.gallery);
      renderPromo(v.promo);
    }

    renderFooter(globalData);
  }

  window.Portfolio.Renderer = {
    renderPage: renderPage,
    icon: icon
  };
})();
