//Variables
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCaritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    //Mostrar cursos guardados en localStorage
    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carritoHTML();
    })

    //Vaciar el carrito
    vaciarCaritoBtn.addEventListener("click", () => {
        articulosCarrito = [] //resetreaer el arreglo

        limpiarHTML(); //Eliminamos todo del HTML
    });

}

//Funciones 

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {

    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        //Eliminar del arreglo de articulosCarrito por data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el carrito y mostrar el HTML

    }

}

//Lee el contenido del HTML al que se hace click y extraer informacion del curso
function leerDatosCurso(curso) {

    //Crear un ibtejti cin ek contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        //Actualizar cantidad
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {

                curso.cantidad++;
                return curso; //Retorna obtejto actualizado

            } else {

                return curso; //Retorna objetos que no fueron actualizados en cantidad

            }
        });

        articulosCarrito = [...cursos];

    } else {
        //Agregar el curso al carrito

        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, id, cantidad } = curso;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}" width ="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `;

        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);

    });

    //Agregar carrito de compras al LocalStorage
    sincronizarStorage();

}

//Sincronizar con LocalStorage
function sincronizarStorage() {

    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));

}

//Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = "";

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}