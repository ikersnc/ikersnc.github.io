//Posts de ejemplo

const POSTS = [
  {
    id: 1,
    titulo: "Cómo funciona realmente una petición HTTP",
    fecha: "2026-09-20",
    categoria: "Redes",
    color: ["#2563eb", "#06b6d4"],
    icono: "📡",
    resumen: "Desde que escribes una URL hasta que ves la página pasan muchas cosas: DNS, TCP, TLS y, por fin, HTTP. Lo repasamos paso a paso.",
    etiquetas: ["http", "tcp", "dns"],
    contenido: `
      <p>Cada vez que escribimos una dirección en el navegador se pone en marcha una cadena de protocolos que normalmente damos por sentada. Entenderla es fundamental para cualquiera que quiera desarrollar aplicaciones en red.</p>
      <h2>1. Resolución DNS</h2>
      <p>El navegador necesita convertir el nombre de dominio en una dirección IP. Primero consulta su propia caché, después la del sistema operativo y, si no la encuentra, pregunta al servidor DNS configurado, que a su vez puede consultar a los servidores raíz, a los del TLD y a los autoritativos.</p>
      <h2>2. Conexión TCP</h2>
      <p>Con la IP ya conocida se establece una conexión TCP mediante el famoso <em>three-way handshake</em>: <code>SYN</code>, <code>SYN-ACK</code> y <code>ACK</code>. A partir de aquí ambos extremos tienen un canal fiable y ordenado.</p>
      <h2>3. Negociación TLS</h2>
      <p>Si la URL empieza por <code>https://</code>, cliente y servidor negocian una sesión cifrada: se intercambian certificados, se acuerda el algoritmo y se generan claves de sesión.</p>
      <h2>4. La petición y la respuesta</h2>
      <p>Por último el navegador envía algo como:</p>
      <pre><code>GET /index.html HTTP/1.1
Host: www.ejemplo.com
Accept: text/html</code></pre>
      <p>El servidor contesta con un código de estado (<code>200 OK</code>, <code>404 Not Found</code>…), unas cabeceras y el cuerpo con el HTML. El navegador lo analiza, descubre que necesita CSS, JavaScript e imágenes, y repite el proceso para cada recurso.</p>
      <blockquote>Conocer este flujo ayuda muchísimo a depurar: la pestaña <strong>Red</strong> de las herramientas de desarrollador muestra cada una de estas fases.</blockquote>
    `
  },
  {
    id: 2,
    titulo: "Flexbox vs. Grid: cuándo usar cada uno",
    fecha: "2026-09-12",
    categoria: "Desarrollo web",
    color: ["#7c3aed", "#ec4899"],
    icono: "🎨",
    resumen: "Los dos sistemas de maquetación modernos de CSS no compiten entre sí: se complementan. Te cuento cómo decido cuál usar en cada caso.",
    etiquetas: ["css", "flexbox", "grid"],
    contenido: `
      <p>Durante años maquetar en CSS significaba pelearse con <code>float</code> y <code>clearfix</code>. Hoy tenemos dos herramientas mucho más potentes: <strong>Flexbox</strong> y <strong>CSS Grid</strong>.</p>
      <h2>Flexbox: una dimensión</h2>
      <p>Flexbox está pensado para distribuir elementos en <em>una</em> dirección, ya sea en fila o en columna. Es ideal para barras de navegación, botones con icono y texto, o centrar un elemento.</p>
      <pre><code>.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>
      <h2>Grid: dos dimensiones</h2>
      <p>Grid controla filas y columnas a la vez. Es perfecto para el esqueleto de una página o para galerías de tarjetas como la de la portada de este blog:</p>
      <pre><code>.posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}</code></pre>
      <h2>Mi regla práctica</h2>
      <ul>
        <li>Si el contenido manda y solo me importa una dirección → <strong>Flexbox</strong>.</li>
        <li>Si el diseño manda y quiero una rejilla → <strong>Grid</strong>.</li>
        <li>Y muchas veces, ambos: Grid para el layout general y Flexbox dentro de cada componente.</li>
      </ul>
    `
  },
  {
    id: 3,
    titulo: "JavaScript sin frameworks: manipulando el DOM",
    fecha: "2026-09-03",
    categoria: "Desarrollo web",
    color: ["#f59e0b", "#ef4444"],
    icono: "⚡",
    resumen: "Antes de aprender React o Vue merece la pena dominar el JavaScript nativo. Este mismo blog está hecho así, y te enseño cómo.",
    etiquetas: ["javascript", "dom", "vanilla"],
    contenido: `
      <p>Los frameworks son geniales, pero todos se apoyan en las mismas APIs del navegador. Conocerlas te convierte en mejor desarrollador, uses lo que uses después.</p>
      <h2>Seleccionar elementos</h2>
      <pre><code>const lista = document.querySelector("#posts");
const botones = document.querySelectorAll(".btn");</code></pre>
      <h2>Crear contenido dinámicamente</h2>
      <p>Las tarjetas de la portada no están escritas en el HTML: se generan a partir de un array de objetos con <code>map()</code> y plantillas literales, y se insertan en el contenedor.</p>
      <h2>Escuchar eventos</h2>
      <pre><code>buscador.addEventListener("input", (e) => {
  filtrar(e.target.value);
});</code></pre>
      <h2>Guardar datos en el navegador</h2>
      <p>Sin backend, <code>localStorage</code> permite persistir información sencilla: el tema claro/oscuro, los "me gusta" o los comentarios de cada entrada de este blog se guardan ahí.</p>
      <blockquote>Consejo: separa siempre los datos de la presentación. Si mañana los posts vinieran de una API, solo cambiaría el origen del array.</blockquote>
    `
  },
  {
    id: 4,
    titulo: "Montando un pequeño laboratorio de redes en casa",
    fecha: "2026-08-24",
    categoria: "Redes",
    color: ["#059669", "#84cc16"],
    icono: "🔌",
    resumen: "Una Raspberry Pi, un switch barato y algo de paciencia bastan para practicar VLANs, DHCP y servidores web sin salir de casa.",
    etiquetas: ["raspberry", "vlan", "homelab"],
    contenido: `
      <p>La teoría de redes se entiende mucho mejor cuando rompes (y arreglas) tu propia red. Este verano monté un pequeño <em>homelab</em> con muy poco presupuesto.</p>
      <h2>El material</h2>
      <ul>
        <li>Una Raspberry Pi 4 con Raspberry Pi OS Lite.</li>
        <li>Un switch gestionable de 8 puertos con soporte de VLAN.</li>
        <li>Un par de cables de red y un portátil viejo.</li>
      </ul>
      <h2>Qué he practicado</h2>
      <p>Configuré dos VLAN (una para dispositivos "de confianza" y otra para invitados), un servidor DHCP con <code>dnsmasq</code> en la Raspberry y un servidor web con Nginx para alojar versiones de prueba de mis proyectos, incluido este blog.</p>
      <h2>Lo que he aprendido</h2>
      <p>Sobre todo, a usar <code>ping</code>, <code>traceroute</code>, <code>tcpdump</code> y Wireshark para entender qué está pasando realmente. Nada como capturar un <em>handshake</em> TCP con tus propios ojos.</p>
    `
  },
  {
    id: 5,
    titulo: "Mi rutina de estudio para tercero de carrera",
    fecha: "2026-08-10",
    categoria: "Universidad",
    color: ["#0ea5e9", "#6366f1"],
    icono: "📚",
    resumen: "Tercero llega con más asignaturas prácticas y más entregas. Estas son las técnicas que me están funcionando para no ir con el agua al cuello.",
    etiquetas: ["estudio", "productividad"],
    contenido: `
      <p>Tercero es, para muchos, el curso más exigente de la carrera: las asignaturas se vuelven más prácticas y las entregas se acumulan.</p>
      <h2>Bloques Pomodoro</h2>
      <p>Trabajo en bloques de 50 minutos con 10 de descanso. Para programar funciona mejor que los 25 minutos clásicos, porque entrar "en zona" cuesta un rato.</p>
      <h2>Un repositorio por asignatura</h2>
      <p>Todo el código de prácticas va a un repositorio Git. Aunque sea un proyecto individual, hacer <em>commits</em> pequeños me permite volver atrás cuando algo se rompe.</p>
      <h2>Explicar para aprender</h2>
      <p>Este blog nace precisamente de ahí: escribir sobre lo que estudio me obliga a entenderlo de verdad. Si no sé explicarlo, es que no lo sé.</p>
    `
  },
  {
    id: 6,
    titulo: "Accesibilidad web: pequeños cambios, gran impacto",
    fecha: "2026-07-28",
    categoria: "Desarrollo web",
    color: ["#db2777", "#f97316"],
    icono: "♿",
    resumen: "Etiquetas semánticas, textos alternativos y buen contraste. La accesibilidad no es un extra: es parte de hacer bien una web.",
    etiquetas: ["accesibilidad", "html", "a11y"],
    contenido: `
      <p>Una web accesible es una web que puede usar cualquier persona, independientemente de sus capacidades o del dispositivo con el que navegue.</p>
      <h2>Usa HTML semántico</h2>
      <p>Etiquetas como <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code> y <code>&lt;footer&gt;</code> dan estructura al documento y ayudan a los lectores de pantalla a orientarse.</p>
      <h2>Contraste y tamaño de texto</h2>
      <p>Las pautas WCAG recomiendan un contraste mínimo de 4.5:1 para el texto normal. Usar unidades relativas (<code>rem</code>) respeta la configuración de tamaño del usuario.</p>
      <h2>Navegación con teclado</h2>
      <p>Todo lo que se puede hacer con ratón debe poder hacerse con teclado. Nunca elimines el indicador de foco sin sustituirlo por otro visible.</p>
      <h2>Formularios</h2>
      <p>Cada campo necesita su <code>&lt;label&gt;</code> y los errores deben anunciarse de forma clara, no solo con un color rojo.</p>
    `
  }
];