// main.js - compatibilidad máxima: no usar 'module' ni features no compatibles ampliamente.
// Se carga con defer en las páginas.

(function () {
  'use strict';

  // Actualiza variables CSS (--bg-image, --header-image) si están definidas en data-* del body/header
  var body = document.querySelector('body.theme-space');
  var header = document.querySelector('.site-header');

  if (body && body.dataset && body.dataset.bg) {
    try {
      document.documentElement.style.setProperty('--bg-image', "url('" + body.dataset.bg + "')");
    } catch (e) {
      // silencioso en navegadores muy antiguos
    }
  }

  if (header && header.dataset && header.dataset.header) {
    try {
      document.documentElement.style.setProperty('--header-image', "url('" + header.dataset.header + "')");
    } catch (e) {
      // silencioso
    }
  }

  // efecto de transición para elementos con la clase .glow-on-hover
  var glowers = document.querySelectorAll('.glow-on-hover');
  if (glowers && glowers.length) {
    Array.prototype.forEach.call(glowers, function (el) {
      el.addEventListener('mouseenter', function () {
        el.style.transition = 'text-shadow .15s ease, box-shadow .15s ease, transform .1s ease, color .15s ease';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transition = '';
      });
      el.addEventListener('focus', function () {
        el.style.transition = 'text-shadow .15s ease, box-shadow .15s ease, transform .1s ease, color .15s ease';
      });
      el.addEventListener('blur', function () {
        el.style.transition = '';
      });
    });
  }

  // En contact.html: manejo simple del form (si existe)
  var form = document.getElementById('contact-form');
  var feedback = document.getElementById('contact-feedback');
  if (form) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      // sólo demo: validación sencilla y mensaje al usuario
      var name = (document.getElementById('name') || { value: '' }).value.trim();
      var email = (document.getElementById('email') || { value: '' }).value.trim();
      var message = (document.getElementById('message') || { value: '' }).value.trim();

      if (!name || !email || !message) {
        if (feedback) feedback.textContent = 'Por favor completa todos los campos.';
        return;
      }

      if (feedback) {
        feedback.textContent = 'Gracias, tu mensaje ha sido recibido (demo).';
      }
      form.reset();
    });
  }

})();
