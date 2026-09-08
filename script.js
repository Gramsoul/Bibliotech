import libros from "./libros.js";

const screen = document.querySelector("#book_screen");
const btnCarga = document.querySelector("#boton-carga");
const btnGenero = document.querySelector("#genero");


function cargaLibros(
    titulo = "",
    autor = "",
    genero = "",
    año = "",
    disp = null,
    fav = null) {
    screen.innerHTML = "";

    libros.forEach(element => {

        let estado_fav = "no_fav";
        let estado_disp = "no_disp";

        if (titulo && !element.titulo.toLowerCase().includes(titulo.toLowerCase()))
            return;

        if (autor && !element.autor.toLowerCase().includes(autor.toLowerCase()))
            return;

        if (genero && !element.genero.toLowerCase().includes(genero.toLowerCase()))
            return;

        if (año && element.ano != año)
            return;

        if (disp !== null && element.disponible !== disp)
            return;

        if (fav !== null && element.favorito !== fav)
            return;


        screen.innerHTML += `
            <article class="card" id="${element.id}">
                <div class="btn-bar">
                    <icon class="fav ${element.favorito ? "fav-no-active" : "fav-active"}"></icon>
                    <icon class="disp ${element.disponible ? "disp-no-active" : "disp-active"}"></icon>
                </div>
                <div>
                    <h2>${element.titulo}</h2>
                    <p>Autor: ${element.autor}</p>
                    <p>Genero: ${element.genero}</p>
                    <p>Año de lanzamiento: ${element.ano}</p>
                </div>
            </article>
        `
    });
}

function estadoDisp(id) {
    libros.forEach(e => {
        if (e.id != id) return

        e.disponible = !e.disponible;
    })
}

cargaLibros();
const btnCard = document.querySelectorAll("#btn-card");

btnCarga.addEventListener("click", (event) => {
    event.preventDefault();

    let titulo = document.querySelector("#titulo").value;
    let autor = document.querySelector("#autor").value;
    let genero = document.querySelector("#genero").value;
    let año = document.querySelector("#año").value;
    let disp = document.querySelector("#disp").checked;
    let fav = document.querySelector("#fav").checked;
    if (disp != true) disp = null
    if (fav != true) fav = null

    console.log({ titulo });
    console.log({ autor });
    console.log({ genero });
    console.log({ año });
    console.log({ disp });
    console.log({ fav });

    cargaLibros(titulo, autor, genero, año, disp, fav)
})

btnGenero.addEventListener("change", (e) => { 
    cargaLibros("", "", e.target.value)
})

screen.addEventListener("click", (e) => {
    const fav = e.target.closest(".fav");
    const disp = e.target.closest(".disp");
    const card = e.target.closest(".card").getAttribute("id");
    if (!fav && !disp) return;
})
