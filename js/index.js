const estado = {
    busqueda: "",
    categoria: "Todas",
    orden: "recientes"
};

// Genera el HTML de una tarjeta de entrada
function crearTarjeta(post) {
    const likes = almacen.leer("likes", {})[post.id] || 0;
    return `
        <article class="tarjeta">
        <a href="post.html?id=${post.id}" class="tarjeta-portada"
            style="background: linear-gradient(135deg, ${post.color[0]}, ${post.color[1]})"
            aria-hidden="true" tabindex="-1">
            <span>${post.icono}</span>
        </a>
        <div class="tarjeta-cuerpo">
            <span class="chip">${post.categoria}</span>
            <h3><a href="post.html?id=${post.id}">${post.titulo}</a></h3>
            <p class="meta">
            <time datetime="${post.fecha}">${formatearFecha(post.fecha)}</time>
            · ${tiempoLectura(post.contenido)} min de lectura
            </p>
            <p>${post.resumen}</p>
            <div class="tarjeta-pie">
            <a href="post.html?id=${post.id}" class="leer-mas">Leer más →</a>
            <span class="likes" title="Me gusta">❤ ${likes}</span>
            </div>
        </div>
        </article>
    `;
}

// Aplica búsqueda, filtro y orden, y vuelve a pintar la lista
function renderizarPosts() {
    const texto = estado.busqueda.toLowerCase();

    let lista = POSTS.filter((p) => {
        const coincideCategoria = estado.categoria === "Todas" || p.categoria === estado.categoria;
        const coincideTexto =
        p.titulo.toLowerCase().includes(texto) ||
        p.resumen.toLowerCase().includes(texto) ||
        p.etiquetas.some((e) => e.includes(texto));
        return coincideCategoria && coincideTexto;
    });

    lista.sort((a, b) => {
        if (estado.orden === "antiguos") return a.fecha.localeCompare(b.fecha);
        if (estado.orden === "titulo") return a.titulo.localeCompare(b.titulo, "es");
        return b.fecha.localeCompare(a.fecha);
    });

    const contenedor = document.getElementById("lista-posts");
    const contador = document.getElementById("contador");

    contenedor.innerHTML = lista.length
        ? lista.map(crearTarjeta).join("")
        : `<p class="vacio">No se han encontrado entradas para "<strong>${escaparHTML(estado.busqueda)}</strong>".</p>`;

    contador.textContent = `${lista.length} ${lista.length === 1 ? "entrada" : "entradas"}`;
}

// Crea los botones de filtro por categoría
function renderizarFiltros() {
    const categorias = ["Todas", ...new Set(POSTS.map((p) => p.categoria))];
    const contenedor = document.getElementById("filtros");

    contenedor.innerHTML = categorias
        .map((c) => `<button class="filtro${c === estado.categoria ? " activo" : ""}" data-categoria="${c}">${c}</button>`)
        .join("");

    contenedor.querySelectorAll(".filtro").forEach((boton) =>
        boton.addEventListener("click", () => {
        estado.categoria = boton.dataset.categoria;
        renderizarFiltros();
        renderizarPosts();
        })
    );
}

//Barra lateral: número de entradas por categoría y nube de etiquetas
function renderizarLateral() {
    const conteo = {};
    POSTS.forEach((p) => (conteo[p.categoria] = (conteo[p.categoria] || 0) + 1));

    document.getElementById("lista-categorias").innerHTML = Object.entries(conteo)
        .map(([cat, n]) => `<li><a href="#entradas" data-categoria="${cat}">${cat}</a> <span>${n}</span></li>`)
        .join("");

    document.querySelectorAll("#lista-categorias a").forEach((enlace) =>
        enlace.addEventListener("click", () => {
            estado.categoria = enlace.dataset.categoria;
            renderizarFiltros();
            renderizarPosts();
        })
    );

    const etiquetas = [...new Set(POSTS.flatMap((p) => p.etiquetas))].sort();
    document.getElementById("nube-etiquetas").innerHTML = etiquetas
        .map((e) => `<button class="etiqueta" data-etiqueta="${e}">#${e}</button>`)
        .join("");

    document.querySelectorAll(".etiqueta").forEach((boton) =>
        boton.addEventListener("click", () => {
            const buscador = document.getElementById("buscador");
            buscador.value = boton.dataset.etiqueta;
            estado.busqueda = boton.dataset.etiqueta;
            renderizarPosts();
            document.getElementById("entradas").scrollIntoView({ behavior: "smooth" });
        })
    );
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarFiltros();
    renderizarPosts();
    renderizarLateral();

    document.getElementById("buscador").addEventListener("input", (e) => {
        estado.busqueda = e.target.value.trim();
        renderizarPosts();
    });

    document.getElementById("orden").addEventListener("change", (e) => {
        estado.orden = e.target.value;
        renderizarPosts();
    });
});