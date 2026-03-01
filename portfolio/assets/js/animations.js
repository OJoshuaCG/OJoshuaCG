/**
 * animations.js - Scroll-triggered animations
 * Namespace: window.Portfolio.Animations
 */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};

  var observer = null;

  function init() {
    /* Disconnect previous observer if re-initializing (e.g. after lang change) */
    if (observer) {
      observer.disconnect();
    }

    var elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    /* Reset visibility for re-initialization */
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('is-visible');
    }

    if (!('IntersectionObserver' in window)) {
      /* Fallback: just show everything */
      for (var j = 0; j < elements.length; j++) {
        elements[j].classList.add('is-visible');
      }
      return;
    }

    observer = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        if (entries[k].isIntersecting) {
          entries[k].target.classList.add('is-visible');

          /* Animate skill bars within this element */
          var bars = entries[k].target.querySelectorAll('.skill-bar-fill');
          for (var b = 0; b < bars.length; b++) {
            var width = bars[b].getAttribute('data-width');
            if (width) {
              bars[b].style.width = width + '%';
              bars[b].classList.add('animate');
            }
          }

          observer.unobserve(entries[k].target);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    for (var m = 0; m < elements.length; m++) {
      observer.observe(elements[m]);
    }
  }

  window.Portfolio.Animations = {
    init: init
  };
})();
