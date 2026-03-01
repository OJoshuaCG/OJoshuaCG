/**
 * i18n.js - Internationalization system
 * Namespace: window.Portfolio.I18n
 */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};

  var STORAGE_KEY = 'portfolio-lang';
  var DEFAULT_LANG = 'es';
  var SUPPORTED = ['es', 'en'];
  var currentLang = DEFAULT_LANG;
  var changeCallbacks = [];

  /**
   * Detect language from localStorage or browser
   */
  function detectLang() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }

    if (stored && SUPPORTED.indexOf(stored) !== -1) {
      return stored;
    }

    var browserLang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    if (SUPPORTED.indexOf(browserLang) !== -1) {
      return browserLang;
    }

    return DEFAULT_LANG;
  }

  /**
   * Set language and persist
   */
  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* ignore */ }
    document.documentElement.setAttribute('lang', lang);
    for (var i = 0; i < changeCallbacks.length; i++) {
      changeCallbacks[i](lang);
    }
  }

  /**
   * Get current language
   */
  function getLang() {
    return currentLang;
  }

  /**
   * Toggle between languages
   */
  function toggle() {
    var next = currentLang === 'es' ? 'en' : 'es';
    setLang(next);
  }

  /**
   * Resolve a bilingual object { es: "...", en: "..." } to current language string.
   * If the value is a plain string, return it as-is.
   */
  function resolve(obj) {
    if (obj === null || obj === undefined) return '';
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'object' && obj[currentLang] !== undefined) {
      return obj[currentLang];
    }
    if (typeof obj === 'object' && obj[DEFAULT_LANG] !== undefined) {
      return obj[DEFAULT_LANG];
    }
    return String(obj);
  }

  /**
   * Register a callback for language changes
   */
  function onChange(fn) {
    changeCallbacks.push(fn);
  }

  /**
   * Initialize: detect and set initial lang
   */
  function init() {
    currentLang = detectLang();
    document.documentElement.setAttribute('lang', currentLang);
  }

  window.Portfolio.I18n = {
    init: init,
    getLang: getLang,
    setLang: setLang,
    toggle: toggle,
    resolve: resolve,
    onChange: onChange
  };
})();
