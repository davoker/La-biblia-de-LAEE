/* La biblia de LAEE - Activación de los carruseles de imágenes.
   En VK ese comportamiento lo aportaba su JavaScript; aquí se reproduce
   de forma local: flechas izquierda/derecha, desplazamiento con animación
   y contador "N de M". No requiere conexión. */
(function () {
  'use strict';

  if (typeof document === 'undefined') { return; } // permite validar con cscript

  function preparar(carrusel) {
    if (carrusel.getAttribute('data-laee-listo') === '1') { return; }

    var interno = carrusel.querySelector('.article_photo_carousel_inner');
    var wraps = carrusel.querySelectorAll('.article_carousel_img_wrap');
    var izquierda = carrusel.querySelector('.article_photo_carousel__left');
    var derecha = carrusel.querySelector('.article_photo_carousel__right');
    var contador = carrusel.querySelector('.article_photo_carousel__counter');

    if (!interno || !wraps || wraps.length === 0) { return; }

    var total = wraps.length;
    var posicion = 0;
    var plantilla = (contador && contador.getAttribute('data-counter-lang')) || '{counter} de {total}';

    function pintar() {
      interno.style.transform = 'translateX(-' + (posicion * 100) + '%)';
      if (izquierda) { izquierda.style.display = (posicion > 0) ? '' : 'none'; }
      if (derecha) { derecha.style.display = (posicion < total - 1) ? '' : 'none'; }
      if (contador) {
        var texto = plantilla
          .replace(/\{counter\}/g, String(posicion + 1))
          .replace(/\{total\}/g, String(total));
        while (contador.firstChild) { contador.removeChild(contador.firstChild); }
        contador.appendChild(document.createTextNode(texto));
      }
    }

    function irA(n) {
      if (n < 0 || n > total - 1 || n === posicion) { return; }
      posicion = n;
      pintar();
    }

    if (izquierda) {
      izquierda.onclick = function () { irA(posicion - 1); return false; };
      izquierda.setAttribute('title', 'Imagen anterior');
    }
    if (derecha) {
      derecha.onclick = function () { irA(posicion + 1); return false; };
      derecha.setAttribute('title', 'Imagen siguiente');
    }

    carrusel.setAttribute('data-laee-listo', '1');
    pintar();
  }

  function iniciar() {
    var carruseles = document.querySelectorAll('.article_photo_carousel');
    for (var i = 0; i < carruseles.length; i++) {
      preparar(carruseles[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
  window.addEventListener('load', iniciar);
})();
