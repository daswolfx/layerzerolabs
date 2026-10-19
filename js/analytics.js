/** GA4 hooks are inert until an approved measurement ID is added to data-ga4-id. */
(function initAnalytics() {
  'use strict';

  const measurementId = document.currentScript?.dataset.ga4Id?.trim() || '';
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(tag);
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  for (const link of document.querySelectorAll('[data-track-shop]')) {
    link.addEventListener('click', () => window.gtag('event', 'shop_click', { destination: 'shopify' }));
  }
  for (const link of document.querySelectorAll('[data-track-quote]')) {
    link.addEventListener('click', () => window.gtag('event', 'start_project_click'));
  }

  const form = document.getElementById('quote-form');
  if (form) {
    let began = false;
    form.addEventListener('focusin', () => {
      if (began) return;
      began = true;
      window.gtag('event', 'begin_quote');
    });
  }

  if (document.body.dataset.page === 'thank-you' && document.body.dataset.confirmed === 'true') {
    window.gtag('event', 'generate_lead', { method: 'project_request' });
  }
})();
