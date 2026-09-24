/* Botón de tema de las guías (icono de la luna) ---------------------------------------------------
   VK dejó en las páginas guardadas el botón "Cambiar el color del tema", pero sin su JavaScript,
   así que era decorativo. Este script lo hace funcionar:
     - 1.er clic  -> modo claro (fondo blanco)
     - 2.º clic   -> modo oscuro (fondo negro, el original)
     - La elección se guarda en localStorage y vale para las 12 guías.
   Cómo conmuta: la clase "article_dark" (en <body> y en .article_layer), el atributo scheme de la
   capa (vkcom_dark / vkcom_light) y el atributo theme de .article_theme (dark / light).
   El script se inyecta justo después de <body>, así que aplica el tema guardado lo antes posible.
   Se escrito en ES5 a propósito: se puede comprobar con cscript (JScript) sin errores.
   ------------------------------------------------------------------------------------------------- */
(function () {
  'use strict';

  /* Prueba de sintaxis fuera del navegador: no hay documento, no hay nada que hacer. */
  if (typeof document === 'undefined') { return; }

  var CLAVE = 'laee_tema';        /* 'oscuro' | 'claro' */
  var CLASE_OSCURO = 'article_dark';
  var completo = false;           /* true cuando ya se han tocado capa + artículo + botón */

  /* ---------- almacenamiento (puede no existir en file://) ---------- */

  function leer() {
    try { return window.localStorage.getItem(CLAVE); } catch (e) { return null; }
  }

  function guardar(valor) {
    try { window.localStorage.setItem(CLAVE, valor); } catch (e) { /* sin almacenamiento */ }
  }

  /* ---------- estado ---------- */

  function esOscuro() {
    return !!(document.body && document.body.classList.contains(CLASE_OSCURO));
  }

  function preferenciaGuardada() {
    var guardado = leer();
    if (guardado === 'claro') { return false; }
    if (guardado === 'oscuro') { return true; }
    return esOscuro();           /* sin preferencia: el tema que trae la página */
  }

  function ponerClase(el, activa) {
    if (!el || !el.classList) { return; }
    if (activa) { el.classList.add(CLASE_OSCURO); }
    else { el.classList.remove(CLASE_OSCURO); }
  }

  function aplicar(oscuro) {
    var capa = document.querySelector('.article_layer');
    var tema = document.querySelector('.article_theme');
    var boton = document.querySelector('.article_layer__dark');

    ponerClase(document.body, oscuro);

    if (capa) {
      ponerClase(capa, oscuro);
      capa.setAttribute('scheme', oscuro ? 'vkcom_dark' : 'vkcom_light');
    }
    if (tema) {
      tema.setAttribute('theme', oscuro ? 'dark' : 'light');
    }
    if (boton) {
      boton.setAttribute('tabindex', '0');
      boton.setAttribute('aria-pressed', oscuro ? 'true' : 'false');
      boton.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      boton.setAttribute('title', boton.getAttribute('aria-label'));
    }
    if (capa && tema && boton) { completo = true; }
  }

  function aplicarGuardado() { aplicar(preferenciaGuardada()); }

  function alternar() {
    var nuevo = !esOscuro();
    aplicar(nuevo);
    guardar(nuevo ? 'oscuro' : 'claro');
  }

  /* ---------- eventos (por delegación: el botón puede aparecer después) ---------- */

  function esElBoton(nodo) {
    while (nodo && nodo !== document) {
      if (nodo.classList && nodo.classList.contains('article_layer__dark')) { return true; }
      nodo = nodo.parentNode;
    }
    return false;
  }

  document.addEventListener('click', function (ev) {
    if (ev.target && esElBoton(ev.target)) {
      ev.preventDefault();
      ev.stopPropagation();
      alternar();
    }
  }, false);

  document.addEventListener('keydown', function (ev) {
    var tecla = ev.key || ev.keyCode;
    if (tecla === 'Enter' || tecla === ' ' || tecla === 'Spacebar' || tecla === 13 || tecla === 32) {
      if (ev.target && esElBoton(ev.target)) {
        ev.preventDefault();
        alternar();
      }
    }
  }, false);

  /* ---------- aplicación del tema ---------- */

  aplicarGuardado();                                  /* 1) ya, con <body> recién abierto */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicarGuardado, false);   /* 2) DOM completo */
    if (typeof MutationObserver !== 'undefined') {                           /* 3) en cuanto
                                                                                existan la capa,
                                                                                el artículo y el
                                                                                botón */
      var observador = new MutationObserver(function () {
        aplicarGuardado();
        if (completo) { observador.disconnect(); }
      });
      observador.observe(document.documentElement, { childList: true, subtree: true });
    }
  } else {
    aplicarGuardado();
  }

  window.addEventListener('load', aplicarGuardado, false);                  /* 4) tras cargar */
}());
