/**
 * navigation.js - Navigation system
 * Namespace: window.Portfolio.Navigation
 */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};

  var scrollHandler = null;

  function init(page) {
    initHamburger();
    initSmoothScroll();
    initNavbarScroll();
    initBackToTop();
    if (page === 'index') {
      initScrollSpy();
    }
  }

  /* ---- Hamburger mobile menu ---- */
  function initHamburger() {
    var btn = document.querySelector('.hamburger');
    var menu = document.querySelector('.mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var expanded = btn.classList.toggle('active');
      menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', expanded);
    });

    /* Close menu when a link is clicked */
    var links = menu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        btn.classList.remove('active');
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* ---- Smooth scroll for anchor links ---- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ---- Navbar background on scroll ---- */
  function initNavbarScroll() {
    var navbar = document.querySelector('[data-section="navbar"]');
    if (!navbar) return;

    var check = window.Portfolio.Utils.throttle(function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, 100);

    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /* ---- Scroll spy: highlight active nav link ---- */
  function initScrollSpy() {
    var navLinks = document.querySelectorAll('.nav-link[data-nav]');
    if (!navLinks.length) return;

    /* Remove previous handler if re-initialized */
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler);
    }

    var sections = [];
    for (var i = 0; i < navLinks.length; i++) {
      var id = navLinks[i].getAttribute('data-nav');
      var section = document.getElementById(id);
      if (section) {
        sections.push({ id: id, el: section });
      }
    }

    scrollHandler = window.Portfolio.Utils.throttle(function () {
      var scrollPos = window.scrollY + 120;
      var activeId = '';

      for (var j = 0; j < sections.length; j++) {
        if (sections[j].el.offsetTop <= scrollPos) {
          activeId = sections[j].id;
        }
      }

      for (var k = 0; k < navLinks.length; k++) {
        var link = navLinks[k];
        if (link.getAttribute('data-nav') === activeId) {
          link.classList.add('text-white');
          link.classList.remove('text-gray-300');
        } else {
          link.classList.remove('text-white');
          link.classList.add('text-gray-300');
        }
      }
    }, 100);

    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  /* ---- Back to top button ---- */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    var check = window.Portfolio.Utils.throttle(function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, 100);

    window.addEventListener('scroll', check, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.Portfolio.Navigation = {
    init: init
  };
})();
