/**
 * utils.js - Utility functions
 * Namespace: window.Portfolio.Utils
 */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};

  /**
   * Debounce: delays execution until after wait ms of inactivity
   */
  function debounce(fn, wait) {
    var timer;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    };
  }

  /**
   * Throttle: limits execution to once per limit ms
   */
  function throttle(fn, limit) {
    var inThrottle = false;
    return function () {
      var context = this;
      var args = arguments;
      if (!inThrottle) {
        fn.apply(context, args);
        inThrottle = true;
        setTimeout(function () {
          inThrottle = false;
        }, limit);
      }
    };
  }

  /**
   * Detect current page from body[data-page] attribute
   */
  function detectCurrentPage() {
    var body = document.body;
    return body.getAttribute('data-page') || 'index';
  }

  /**
   * Show error fallback when config.json fails to load
   */
  function showErrorFallback(message) {
    var main = document.querySelector('main') || document.body;
    var fallback = document.createElement('div');
    fallback.className = 'flex flex-col items-center justify-center min-h-[60vh] text-center px-4';
    fallback.innerHTML =
      '<div class="text-6xl mb-4">⚠</div>' +
      '<h2 class="text-2xl font-bold mb-2 text-white">Error loading content</h2>' +
      '<p class="text-gray-400 max-w-md">' + (message || 'Could not load configuration. Please try refreshing the page.') + '</p>' +
      '<button onclick="location.reload()" class="mt-6 px-6 py-2 btn-theme rounded-lg">Reload</button>';
    main.innerHTML = '';
    main.appendChild(fallback);
  }

  /**
   * Image error handler - replaces broken images with a gradient placeholder
   */
  function handleImageError(img) {
    img.onerror = null;
    var alt = img.getAttribute('alt') || '';
    var wrapper = document.createElement('div');
    wrapper.className = 'img-placeholder w-full h-full';
    wrapper.setAttribute('role', 'img');
    wrapper.setAttribute('aria-label', alt);
    wrapper.innerHTML = '<span>' + alt + '</span>';
    if (img.parentNode) {
      img.parentNode.replaceChild(wrapper, img);
    }
  }

  /**
   * Create an img element with error handling
   */
  function createImage(src, alt, className) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';
    if (className) img.className = className;
    img.onerror = function () { handleImageError(img); };
    return img;
  }

  window.Portfolio.Utils = {
    debounce: debounce,
    throttle: throttle,
    detectCurrentPage: detectCurrentPage,
    showErrorFallback: showErrorFallback,
    handleImageError: handleImageError,
    createImage: createImage
  };
})();
