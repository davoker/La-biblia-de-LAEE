# La biblia de LAEE

Compilación local de las guías de **S.T.A.L.K.E.R. Lost Alpha Enhanced Edition**
guardadas de la comunidad de VK (`stalker_enhanced_edition`), reorganizadas,
limpias y con las referencias rotas arregladas.

## Cómo abrirla

- **Recomendado:** abrir `index.html`. Muestra un menú lateral con todas las
  guías y un visor a la derecha donde se carga la guía elegida.
- Cada guía también se puede abrir directamente desde `guias/*.html`.
- **Atajo:** puedes dirigirte directamente a una guía añadiendo `#slug` a esta
  página, por ejemplo `index.html#sistema-de-guardado`. El `#` va con el *slug*
  de la guía, todos en minúsculas y sin acentos.

> Nota: si el navegador bloquea algo al abrir con `file://`, basta con servir
> la carpeta por HTTP local (por ejemplo `python -m http.server` dentro de ella).

## Estructura

```
La biblia de LAEE/
├── index.html          Menú lateral + visor (iframe)
├── css/menu.css        Estilos del menú
├── css/guias.css       Ajustes de lectura de las guías (ancho completo y tablas completas)
├── js/menu.js          Lógica del menú (visitar, filtro, #slug)
├── js/tema.js          Botón de tema de las guías (oscuro ⇄ claro)
├── js/carrusel.js      Flechas de los carruseles de imágenes (32 en 4 guías)
├── guias/               Las 12 guías, una por archivo (UTF-8)
│   ├── descripcion-de-laee.html
│   ├── consejos-para-novatos.html
│   └── …
├── imagenes/            Imágenes propias de cada guía
│   └── <slug>/          (una carpeta por guía; solo guías con imágenes)
├── recursos/vk/         Recursos de VK: CSS, fuentes, iconos e imágenes locales
└── LEEME.md             Este archivo
```

## Índice de guías

| Slug | Guía | Categoría |
|------|------|-----------|
| `descripcion-de-laee` | Descripción de LAEE | General |
| `niveles-de-dificultad` | Niveles de dificultad | General |
| `preguntas-y-respuestas` | Preguntas y respuestas | General |
| `consejos-para-novatos` | Consejos para novatos | Guías de juego |
| `que-es-el-tier-del-mapa` | Que es el Tier del mapa | Guías de juego |
| `enciclopedia-de-artefactos` | Enciclopedia de artefactos de LAEE | Guías de juego |
| `documentos-secretos` | Documentos secretos y contraseñas | Objetos y secretos |
| `usbs-de-actualizacion` | USBs de actualización | Objetos y secretos |
| `herramientas-para-tecnicos` | Herramientas para técnicos | Objetos y secretos |
| `mapa-de-zonas-de-guardado` | Mapa de zonas de guardado | Guardado |
| `sistema-de-guardado` | Sistema de guardado | Guardado |
| `fallos-629-graficas-amd` | Fallos 629 en tarjetas gráficas AMD | Rendimiento |

## Qué se limpió respecto al guardado original de VK

- **Codificación:** los HTML estaban en `windows-1251`; ahora están en **UTF-8**
  (con `charset=utf-8` actualizado).
- **Basura eliminada:**
  - JS externos `.descarga` (444 ficheros, 114 MB) y sus `<script>`/`<link>`.
  - `iframe` de votación de Google Translate (`saved_resource.html`).
  - Contador/analítica de `top-fwz1.mail.ru` (se inyectaba en las 12 guías).
- **Imágenes y recursos:**
  - Todas las rutas `..._files/` reescritas: imágenes propias en
    `imagenes/<slug>/` y recursos repetidos en una sola copia en `recursos/vk/`.
  - `url()` con ruta raíz (`/css/fonts/…`, `/fonts/…`, `/images/…`) y sprites
    `../../images/…` —que solo funcionaban en vk.com— reescritas al CDN de VK,
    de modo que las tipografías e iconos se cargan cuando hay conexión y
    quedan los tipos de letra del sistema cuando no la hay.
- **Verificación:** comprobación automática de que *todas* las referencias
  locales (`src`, `href`, `srcset`, `url()`) de HTML y CSS existen en disco:
  sin ninguna referencia rota.

## Notas

- Las guías conservan el CSS y el JS originales de VK (necesarios para que el
  contenido se vea igual); solo se han depurado y compartido.
- **Ancho de lectura:** VK deja el artículo en una columna de 720 px y la tabla
  de la enciclopedia quedó guardada recortada (`width:2021px` con
  `translateX(-790.5px)`). `css/guias.css` se carga el último en cada guía y lo
  deja fluido: el texto ocupa casi toda la pantalla y la tabla se reparte por el
  ancho disponible (con scroll horizontal solo si de verdad no cabe).
  Si el renglón te parece largo, descomenta la línea `max-width: 1500px`
  comentada en ese mismo archivo.
- **Frases `<cite>`:** VK les dibuja una barra de 120 px arriba y abajo (los
  avisos de "¡Advertencia!…" y similares). `css/guias.css` las quita en todas
  las guías y deja las frases centradas una debajo de otra, como una lista.
  El aviso "¡Advertencia! ¡El artículo contiene spoilers! Quizás…" va, además,
  partido en dos renglones (`<br>`) en las 6 guías donde aparece.
- **Botón de tema (luna/sol):** VK dejó el botón "Cambiar el color del tema"
  pero sin su JavaScript, así que era decorativo. `js/tema.js` (inyectado justo
  después de `<body>` en las 12 guías) lo hace funcionar: **1.er clic → modo
  claro (blanco)**, **siguiente clic → modo oscuro (negro original)**, con la
  elección guardada en `localStorage` (`laee_tema`) para que siga valiendo al
  pasar de una guía a otra. Si el navegador no permite almacenamiento en
  `file://`, el tema sigue funcionando pero no se recuerda entre páginas.
- **Botón ✕ (cerrar artículo):** VK pone a la derecha del botón de tema una ✕
  para cerrar el artículo dentro de su visor; aquí no cierra nada (no hay visor
  de VK), así que se ha quitado de las 12 guías. Solo queda el botón de tema.
- **Flecha "volver arriba":** VK dejó el botón `.article_layer__up` (la flecha de
  la esquina superior) en el HTML pero **sin su JavaScript**, así que no hacía
  nada; y además ocupaba una franja fija de 115 px a la izquierda de **toda** la
  pantalla (`height:100%`) que se comía los clics de esa zona. Ahora:
  `js/arriba.js` le da su función (**sube hasta el principio con desplazamiento
  suave**, también con Enter o Espacio) y `css/guias.css` lo recoloca **justo
  debajo del botón de la luna** (arriba a la derecha, `right:30px; top:80px`),
  reducido a su icono de 48×48 y con resaltado al pasar el cursor.
- **Carruseles de imágenes:** cuatro guías tienen figuras con flechas izquierda/
  derecha ("imagen n.º 2") que en VK las movía su JavaScript, así que aquí eran
  muñecas. `js/carrusel.js` (inyectado como `tema.js`, en las 12 guías) las hace
  funcionar: **1.er clic → la siguiente**, la flecha contraria aparece para
  volver y el contador "N de M" se actualiza; en la última imagen desaparece la
  flecha derecha. Las 72 imágenes de los 32 carruseles ya estaban guardadas en
  `imagenes/`, así que no hace falta nada de red.
- **Imágenes del contenido un 30% más pequeñas:** al pasar a ancho fluido, las
  fotos, los mapas e infografías (`figure > .article_figure_content`) ocupaban
  toda la columna (1400 px y pico) y quedaban desproporcionados.
  `css/guias.css` las escala al **70 %** con dos reglas, porque VK trae los dos
  casos: `zoom: 0.7` para los anchos fijos en píxeles (160, 499, 1157, 2556…)
  y `max-width: 70%` para los que vienen en `width:100%` o `width:2560px`
  (con el `zoom` solo, el navegador volvía a estirarlos al 100 %). Siguen
  centradas por el `margin: 0 auto` de VK, la altura baja en la misma
  proporción —VK la calcula con un porcentaje del ancho, así que no quedan
  huecos— y los carruseles siguen encajando: comprobado midiendo en el
  navegador, tras el clic la siguiente imagen queda exactamente en su sitio
  (ítems de 995 px en una caja de 995 px) y el contador pasa a "2 de 3".
  Para graduarlo hay que cambiar las dos cifras: `0.6`/`60%` = −40 %,
  `0.7`/`70%` = −30 %, `0.8`/`80%` = −20 %.
  (`zoom` lo admiten Chrome, Edge, Safari y Firefox 126 o posterior; en un
  navegador antiguo el `max-width` seguiría reduciendo las figuras de ancho
  completo y solo se quedarían a su tamaño las de píxeles fijos.)
- **Ornamentos `data-sep`:** VK marcaba 6 bloques con `data-sep="N"` para dibujar
  encima un filete ornamental de 35×9 px y dejar 96 px de aire (4 de ellos, en
  `fallos-629-graficas-amd` y `sistema-de-guardado`; los otros 2 eran `<cite>`,
  donde ni siquiera se dibujaba). Se han borrado los atributos de los HTML y
  `css/guias.css` anula la regla por si quedara alguno.
- **Cabecera con logo propio:** VK mostraba en la cabecera el icono redondo de
  la comunidad (48×48 px), el nombre traducido por VK ("Edición mejorada de
  STALKER Lost Alpha") y la fecha de publicación debajo. Ahora todo eso se
  sustituye por un único logo con **dos versiones según el tema**:
  `imagenes/LAEE_logo_top_black.png` (tema claro) y
  `imagenes/LAEE_logo_top_white.png` (tema oscuro). El cambio lo hace el CSS al
  detectar la clase `article_dark` que pone `js/tema.js`, así que el logo cambia
  **al instante al pulsar la luna, sin recargar**. Se dibuja a **48 px de alto**
  (la altura original) con el ancho de la propia imagen
  (`background-size: auto 100%`), así que **sirve cualquier proporción**: no hace
  falta recortar ni deformar el logo. Si falta alguno de los dos ficheros, ese
  tema sale con el hueco vacío (no aparece ningún icono roto).
- **Contador de visitas:** la línea "N visitas" del pie de las 12 guías
  (`article_layer__simple_footer`) se ha eliminado.
- **Pie del menú lateral:** el aviso "Guías guardadas de la comunidad de VK ·
  reorganizadas y limpias para uso local." se ha quitado del `index.html`,
  junto con su regla `.menu__pie` de `css/menu.css`.
- **Aviso de atajo en la portada:** el párrafo "Atajo: puedes enlazar
  directamente a una guía añadiendo `#slug` a esta página, por ejemplo
  `index.html#sistema-de-guardado`." se ha quitado del `index.html` (con sus
  reglas `.panel__pie` y `.panel code` de `css/menu.css`), por ser un detalle
  interno que no debe mostrarse como mensaje en la página principal. El atajo
  sigue funcionando igual y queda explicado en "Cómo abrirla".
- Los enlaces a `m.vk.com/@stalker_enhanced_edition-…` que aparecen en los
  metadatos son el origen original de cada guía.

## Funciona sin conexión

Toda la carpeta se puede usar sin internet (por ejemplo, si VK o el servidor
que la sirve desaparecen):

- **Imágenes:** ya estaban localizadas en `imagenes/<slug>/`.
- **Fuentes, iconos y sprites de VK:** 148 ficheros nuevos descargados a
  `recursos/vk/…` (quedan 170 ficheros, 3,6 MB en total) y reescritas todas las
  referencias: los `url()` de los CSS, los estilos en línea de las guías, el
  favicon y el icono de pantalla de inicio apuntan ahora a esa carpeta.
- **Etiquetas que abrían conexión:** eliminados los `<link rel="preconnect">`
  (login/api de VK) y los `rel="alternate"` (versión móvil y app de Android),
  más la redirección `<noscript>` a `badbrowser.php`. En `documentos-secretos`
  había además dos scripts inline: uno mandaba una petición de estadística a VK
  y el otro volvía a cargar la página cada cierto tiempo (`static.php`); ambos
  quitados.
- **Enlaces entre guías:** los 11 `<a href="https://vk.com/@stalker_enhanced_edition-…">`
  apuntan ya al archivo local correspondiente. Solo quedan 7 enlaces externos
  de navegación (comunidad de VK, dos vídeos de YouTube, DXVK en GitHub,
  texturas en Yandex y el chat de VK): si se pulsan sin internet no se abre
  nada, pero la guía no se ve afectada.
- Las dos últimas `url()` que quedaban apuntaban a un host inválido
  (`www&google.com`) del widget de traducir de Google, que ya se eliminó: se han
  dejado como `background-image:none`.

Comprobación final: **0 referencias externas de descarga**, **456 referencias
locales** comprobadas en disco (todas existen) y **159 URLs responden 200**
sobre el servidor local, además de las 13 páginas.
