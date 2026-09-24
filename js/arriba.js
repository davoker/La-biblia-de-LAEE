/* Botón "volver arriba" de las guías ------------------------------------------------
   VK dejó en las páginas guardadas el botón con clase "article_layer__up" (la flecha
   que apunta hacia arriba) pero sin su JavaScript, así que era decorativo: al pulsarlo
   no pasaba nada. Este script le devuelve su función:
      - clic (o Enter/Espacio con el foco) -> sube hasta el principio de la página.
      - El desplazamiento es suave si el navegador lo admite; si no, va directo.
   Se inyecta después de tema.js y carrusel.js en las 12 guías.
   Está escrito en ES5 a propósito: se puede comprobar con cscript (JScript) sin errores.
   ------------------------------------------------------------------------------------------------- */
(function () {
  'use strict';

  /* Prueba de sintaxis fuera del navegador: no hay documento, no hay nada que hacer. */
  if (typeof document === 'undefined') { return; }

  function subir(ev) {
    if (ev && ev.preventDefault) { ev.preventDefault(); }
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, 0);   /* navegadores antiguos: sin desplazamiento suave */
    }
  }

  function conectar() {
    var boton = document.querySelector('.article_layer__up');
    if (!boton || boton.getAttribute('data-arriba') === '1') { return; }
    boton.setAttribute('data-arriba', '1');
    boton.setAttribute('type', 'button');                       /* que no intente enviar nada */
    boton.setAttribute('aria-label', 'Volver al principio de la página');
    boton.setAttribute('title', 'Volver al principio');
    boton.addEventListener('click', subir, false);
  }

  conectar();                                                   /* 1) ya, con <body> recién abierto */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', conectar, false);   /* 2) DOM completo */
  }
  window.addEventListener('load', conectar, false);                    /* 3) tras cargar */
}());
