function obtenerPost() {
    const id = Number(new URLSearchParams(window.location.search).get("id"));
    return POSTS.find((p) => p.id === id);
}

function renderizarArticulo(post) {
    document.title = `${post.titulo} · Bitácora de Iker`;

    const portada = document.getElementById("post-portada");
    portada.style.background = `linear-gradient(135deg, ${post.color[0]}, ${post.color[1]})`;
    portada.querySelector("span").textContent = post.icono;

    document.getElementById("post-categoria").textContent = post.categoria;
    document.getElementById("post-titulo").textContent = post.titulo;
    document.getElementById("post-meta").innerHTML = `
        Por <strong>Iker Sánchez</strong> ·
        <time datetime="${post.fecha}">${formatearFecha(post.fecha)}</time> ·
        ${tiempoLectura(post.contenido)} min de lectura`;
    document.getElementById("post-contenido").innerHTML = post.contenido;
    document.getElementById("post-etiquetas").innerHTML = post.etiquetas
        .map((e) => `<span class="etiqueta">#${e}</span>`)
        .join("");
}

function renderizarNavegacion(post) {
    const ordenados = [...POSTS].sort((a, b) => a.fecha.localeCompare(b.fecha));
    const i = ordenados.findIndex((p) => p.id === post.id);
    const anterior = ordenados[i - 1];
    const siguiente = ordenados[i + 1];

    document.getElementById("post-navegacion").innerHTML = `
        ${anterior ? `<a href="post.html?id=${anterior.id}" class="nav-anterior"><small>← Anterior</small>${anterior.titulo}</a>` : "<span></span>"}
        ${siguiente ? `<a href="post.html?id=${siguiente.id}" class="nav-siguiente"><small>Siguiente →</small>${siguiente.titulo}</a>` : "<span></span>"}`;
}

function iniciarLikes(post) {
    const boton = document.getElementById("btn-like");
    const contador = document.getElementById("contador-likes");
    const likes = almacen.leer("likes", {});
    const marcados = almacen.leer("likesMarcados", []);

    const pintar = () => {
        contador.textContent = likes[post.id] || 0;
        const marcado = marcados.includes(post.id);
        boton.classList.toggle("activo", marcado);
        boton.setAttribute("aria-pressed", marcado);
    };

    boton.addEventListener("click", () => {
        const i = marcados.indexOf(post.id);
        if (i === -1) {
        marcados.push(post.id);
        likes[post.id] = (likes[post.id] || 0) + 1;
        } else {
        marcados.splice(i, 1);
        likes[post.id] = Math.max(0, (likes[post.id] || 1) - 1);
        }
        almacen.guardar("likes", likes);
        almacen.guardar("likesMarcados", marcados);
        pintar();
    });

    pintar();
}

function renderizarComentarios(post) {
    const comentarios = almacen.leer("comentarios", {})[post.id] || [];
    const lista = document.getElementById("lista-comentarios");

    document.getElementById("num-comentarios").textContent = comentarios.length;

    lista.innerHTML = comentarios.length
        ? comentarios
            .map(
            (c) => `
            <li class="comentario">
            <div class="avatar" aria-hidden="true">${escaparHTML(c.nombre.charAt(0).toUpperCase())}</div>
            <div>
                <p class="comentario-cabecera"><strong>${escaparHTML(c.nombre)}</strong>
                <time>${new Date(c.fecha).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })}</time></p>
                <p>${escaparHTML(c.texto)}</p>
            </div>
            </li>`
            )
            .join("")
        : `<li class="vacio">Todavía no hay comentarios. ¡Sé el primero!</li>`;
}

function iniciarComentarios(post) {
    const form = document.getElementById("form-comentario");
    const error = document.getElementById("error-comentario");
    const textarea = form.texto;
    const caracteres = document.getElementById("caracteres");

    textarea.addEventListener("input", () => {
        caracteres.textContent = `${textarea.value.length}/500`;
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = form.nombre.value.trim();
        const texto = textarea.value.trim();

        if (nombre.length < 2) {
        error.textContent = "El nombre debe tener al menos 2 caracteres.";
        form.nombre.focus();
        return;
        }
        if (texto.length < 5) {
        error.textContent = "El comentario debe tener al menos 5 caracteres.";
        textarea.focus();
        return;
        }
        error.textContent = "";

        const todos = almacen.leer("comentarios", {});
        todos[post.id] = todos[post.id] || [];
        todos[post.id].push({ nombre, texto, fecha: new Date().toISOString() });
        almacen.guardar("comentarios", todos);

        form.reset();
        caracteres.textContent = "0/500";
        renderizarComentarios(post);
    });

    renderizarComentarios(post);
}

function iniciarProgreso() {
    const barra = document.getElementById("progreso");
    window.addEventListener("scroll", () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        barra.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : "0";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const post = obtenerPost();

    if (!post) {
        document.getElementById("articulo").hidden = true;
        document.getElementById("no-encontrado").hidden = false;
        return;
    }

    renderizarArticulo(post);
    renderizarNavegacion(post);
    iniciarLikes(post);
    iniciarComentarios(post);
    iniciarProgreso();
});