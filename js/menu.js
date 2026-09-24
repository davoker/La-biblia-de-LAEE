/* La biblia de LAEE — menú lateral + visor (iframe) */
(function () {
  'use strict';

  var enlaces  = Array.prototype.slice.call(document.querySelectorAll('#menu a[data-slug]'));
  var iframe  = document.getElementById('visor');
  var panel   = document.getElementById('panelInicio');
  var titulo  = document.getElementById('tituloGuia');
  var abierta = document.getElementById('enlaceAbierta');
  var filtro  = document.getElementById('filtro');
  var vacio   = document.getElementById('vacio');
  var atajos  = document.getElementById('atajos');

  var actual = null;

  // Atajos del panel de inicio: primeras cuatro guías
  enlaces.slice(0, 4).forEach(function (a) {
    var li = document.createElement('li');
    var enlace = document.createElement('a');
    enlace.href = a.getAttribute('href');
    enlace.textContent = a.querySelector('.guia__nombre').textContent;
    enlace.addEventListener('click', function (ev) { ev.preventDefault(); abrir(a.dataset.slug); });
    li.appendChild(enlace);
    atajos.appendChild(li);
  });

  function marcar(slug) {
    enlaces.forEach(function (a) {
      a.classList.toggle('activo', a.dataset.slug === slug);
    });
  }

  function abrir(slug) {
    var enlace = null;
    for (var i = 0; i < enlaces.length; i++) {
      if (enlaces[i].dataset.slug === slug) { enlace = enlaces[i]; break; }
    }
    if (!enlace) { mostrarInicio(); return; }

    var nombre = enlace.querySelector('.guia__nombre').textContent;
    actual = slug;

    iframe.src = enlace.getAttribute('href');
    iframe.hidden = false;
    panel.hidden = true;

    titulo.textContent = nombre;
    abierta.href = enlace.getAttribute('href');
    abierta.hidden = false;
    document.title = nombre + ' — La biblia de LAEE';

    marcar(slug);
    if (location.hash !== '#' + slug) { history.replaceState(null, '', '#' + slug); }
    enlace.scrollIntoView({ block: 'nearest' });
  }

  function mostrarInicio() {
    actual = null;
    iframe.hidden = true;
    iframe.src = 'about:blank';
    panel.hidden = false;
    titulo.textContent = 'Índice';
    abierta.hidden = true;
    document.title = 'La biblia de LAEE — Índice de guías';
    marcar(null);
    if (location.hash) { history.replaceState(null, '', location.pathname); }
  }

  function desdeHash() {
    var slug = location.hash.replace(/^#/, '');
    if (slug) { abrir(slug); } else { mostrarInicio(); }
  }

  enlaces.forEach(function (a) {
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      abrir(a.dataset.slug);
    });
  });

  // Filtro de guías
  filtro.addEventListener('input', function () {
    var q = filtro.value.trim().toLowerCase();
    var visibles = 0;
    enlaces.forEach(function (a) {
      var coincide = a.textContent.toLowerCase().indexOf(q) !== -1;
      a.hidden = !coincide;
      if (coincide) { visibles++; }
    });
    document.querySelectorAll('.menu__grupo').forEach(function (g) {
      var alguna = Array.prototype.some.call(g.querySelectorAll('a'), function (a) { return !a.hidden; });
      g.hidden = !alguna;
    });
    vacio.hidden = visibles > 0;
  });

  window.addEventListener('hashchange', desdeHash);
  desdeHash();
})();
