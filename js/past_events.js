let htmlEvents = "";
let card = document.getElementById("card");

let currentDate = new Date(data.currentDate);
for (let event of data.events) {
    let eventDate = new Date(event.date);
    if (eventDate < currentDate) {
        htmlEvents += createCard(event);
    };
};

card.innerHTML = htmlEvents;


let checkbox = document.getElementById("checkbox");
let htmlHome = "";
let cardsearch = [];

for (let category of categories) {
    htmlHome += crearCheckbox(category);
}

checkbox.innerHTML = htmlHome;

let itemsCheckboxes = document.querySelectorAll(".form-check-input");

itemsCheckboxes.forEach(checkbox => checkbox.onchange = () => {
    let htmlResultados = "";
    let checkcategories = [];

    itemsCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkcategories.push(checkbox.value);

        }

    });

    if (checkcategories.length > 0) {
        data.events.filter(event => checkcategories.includes(event.category)).forEach(events => {
            htmlResultados += createCard(events)
        });
    } else {
        data.events.forEach(events => {
            htmlResultados += createCard(events)
        });
    }
    card.innerHTML = htmlResultados;
});

let inputSearch = document.getElementById("search");
let botonBusqueda = document.getElementById("form-busqueda");
botonBusqueda.onsubmit = (e) => {
    e.preventDefault();
    let htmlResultadoTexto = "";
    let textoIngresado = inputSearch.value.toLowerCase().trim();
    let resultadosBusqueda = [];


    for (let event of data.events) {
        if (event.name.toLowerCase().includes(textoIngresado)
            || event.description.toLowerCase().includes(textoIngresado)) {
            htmlResultadoTexto += createCard(event);
            resultadosBusqueda.push(event)

        }
    }
    if (resultadosBusqueda.length == 0) {
        htmlResultadoTexto += `<h4 class="text-muted">Búsqueda no encontrada</h4>`

    }
    console.log(resultadosBusqueda)
    card.innerHTML = htmlResultadoTexto;
}