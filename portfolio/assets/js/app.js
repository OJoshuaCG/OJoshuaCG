/**
 * app.js - Main orchestrator
 * Namespace: window.Portfolio.App
 */
(function () {
  'use strict';

  window.Portfolio = window.Portfolio || {};

  /* Minimal fallback config for file:// protocol */
  var FALLBACK_CONFIG = {
    global: {
      siteName: 'Joshua CG',
      nav: {
        about: { es: 'Sobre mí', en: 'About' },
        tech: { es: 'Tecnologías', en: 'Tech Stack' },
        skills: { es: 'Habilidades', en: 'Skills' },
        projects: { es: 'Proyectos', en: 'Projects' },
        contact: { es: 'Contacto', en: 'Contact' }
      },
      langToggle: {
        label: { es: 'EN', en: 'ES' },
        ariaLabel: { es: 'Cambiar a inglés', en: 'Switch to Spanish' }
      },
      footer: {
        text: { es: 'Hecho con pasión por', en: 'Made with passion by' },
        rights: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' }
      },
      backToTop: { es: 'Volver arriba', en: 'Back to top' },
      backToPortfolio: { es: 'Volver al portafolio', en: 'Back to portfolio' }
    }
  };

  function init() {
    var P = window.Portfolio;

    /* 1. Initialize i18n */
    P.I18n.init();

    /* 2. Detect current page */
    var page = P.Utils.detectCurrentPage();

    /* 3. Fetch config and render */
    loadConfig(function (config) {
      /* 4. Set page title from config */
      setPageTitle(config, page);

      /* 5. Render page content */
      P.Renderer.renderPage(config, page);

      /* 6. Initialize navigation */
      P.Navigation.init(page);

      /* 7. Initialize animations */
      P.Animations.init();

      /* 8. Listen for language changes and re-render */
      P.I18n.onChange(function () {
        P.Renderer.renderPage(config, page);
        P.Navigation.init(page);
        P.Animations.init();
        setPageTitle(config, page);
      });
    });
  }

  function loadConfig(callback) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', './config.json', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 0) {
            try {
              var config = JSON.parse(xhr.responseText);
              callback(config);
            } catch (e) {
              console.warn('Failed to parse config.json, using fallback:', e);
              window.Portfolio.Utils.showErrorFallback('Could not parse configuration file.');
            }
          } else {
            console.warn('Failed to load config.json (status ' + xhr.status + '), using fallback');
            window.Portfolio.Utils.showErrorFallback('Could not load configuration (HTTP ' + xhr.status + ').');
          }
        }
      };
      xhr.send();
    } catch (e) {
      console.warn('XHR not available, using fallback config:', e);
      callback(FALLBACK_CONFIG);
    }
  }

  function setPageTitle(config, page) {
    var r = window.Portfolio.I18n.resolve;
    if (page === 'index') {
      document.title = config.global.siteName + ' | ' + r(config.index.hero.role);
    } else if (config[page] && config[page].meta) {
      document.title = r(config[page].meta.title);
    }
  }

  /* Boot on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.Portfolio.App = {
    init: init
  };
})();
