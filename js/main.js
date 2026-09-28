const almacen = {
    leer(clave, porDefecto) {
        try {
            const valor = localStorage.getItem(clave);
            return valor === null ? porDefecto : JSON.parse(valor);
        } catch (e) {
            return porDefecto;
        }
    },
    guardar(clave, valor) {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
        } catch (e) {
            //Lo ignoramos si el almacenamiento no está disponible
        }
    }
};

//Formatea una fecha ISO (AAAA-MM-DD) en español: "20 de septiembre de 2026". Sin esta función, la fecha me salía de un día antes
function formatearFecha(iso) {
    const fecha = new Date(iso + "T00:00:00");
    return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

//Calcula el tiempo de lectura aproximado (200 palabras por minuto)
function tiempoLectura(html) {
    const texto = html.replace(/<[^>]+>/g, " ");
    const palabras = texto.trim().split(/\s+/).length;
    return Math.max(1, Math.round(palabras / 200));
}

//Escapa texto introducido por el usuario para evitarnos inyecciones de HTML
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function aplicarTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    const boton = document.getElementById("btn-tema");
    boton.textContent = tema === "oscuro" ? "☀️" : "🌙";
    boton.setAttribute("aria-label", tema === "oscuro" ? "Activar tema claro" : "Activar tema oscuro");
}

//Para evitar el parpadeo al cargar con el tema claro
document.documentElement.setAttribute("data-theme", temaInicial());

function temaInicial() {
    const preferenciaSistema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro";
    return almacen.leer("tema", preferenciaSistema);
}

function iniciarTema() {
    aplicarTema(temaInicial());

    const boton = document.getElementById("btn-tema");
    if (boton) {
    boton.addEventListener("click", () => {
        const actual = document.documentElement.getAttribute("data-theme");
        const nuevo = actual === "oscuro" ? "claro" : "oscuro";
        aplicarTema(nuevo);
        almacen.guardar("tema", nuevo);
    });
    }
}

//Menú móvil
function iniciarMenu() {
    const boton = document.getElementById("btn-menu");
    const menu = document.getElementById("menu");
    if (!boton || !menu) return;

    boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto);
    });

    // Cerrar el menú al pulsar un enlace
    menu.querySelectorAll("a").forEach((enlace) =>
    enlace.addEventListener("click", () => {
        menu.classList.remove("abierto");
        boton.setAttribute("aria-expanded", "false");
    })
    );
}

//Botón de volver arriba
function iniciarVolverArriba() {
    const boton = document.getElementById("btn-arriba");
    if (!boton) return;

    window.addEventListener("scroll", () => {
    boton.classList.toggle("visible", window.scrollY > 400);
    });
    boton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

//Arranque normal
document.addEventListener("DOMContentLoaded", () => {
    iniciarTema();
    iniciarMenu();
    iniciarVolverArriba();

    const anio = document.getElementById("anio");
    if (anio) anio.textContent = new Date().getFullYear();
});