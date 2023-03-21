let htmlEvents = "";
let card = document.getElementById("card");
let futueEvents = [];

let currentDate = new Date(data.currentDate);
for (let event of data.events) {
    let eventDate = new Date(event.date);
    if (eventDate > currentDate) {
        htmlEvents += createCard(event);
        futueEvents.push(event);
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

    let textoingresado = inputBusqueda.value.toLowerCase().trim();
    htmlResultados = Search(checkcategories, textoingresado)

    document.querySelector("#card").innerHTML = htmlResultados;
});

function Search(categorias, textoingresado) {
    let htmlResultados = "";
    if (categorias.length > 0 && textoingresado == "") {
        futueEvents.filter(event => categorias.includes(event.category)).forEach(event => {
            htmlResultados += createCard(event)
        });

        console.log(htmlResultados);


    } else if (categorias.length > 0 && textoingresado != "") {
        futueEvents.filter(event => categorias.includes(event.category)).filter(event => event.name.toLowerCase().includes(textoingresado) || event.description.toLowerCase().includes(textoingresado)).forEach(event => { htmlResultados += createCard(event) });

        console.log(htmlResultados);


    } else if (categorias.length == 0 && textoingresado != "") {
        futueEvents.filter(event => event.name.toLowerCase().includes(textoingresado) || event.description.toLowerCase().includes(textoingresado)).forEach(event => { htmlResultados += createCard(event) });


        console.log(htmlResultados);


    } else if (categorias.length == 0 && cardsearch.length == 0) {
        futueEvents.forEach(event => { htmlResultados += createCard(event) });
    }

    return htmlResultados;
}

let inputBusqueda = document.getElementById("search");
document.querySelector("#form-busqueda").onsubmit = (e) => {
    e.preventDefault();
    let htmlResultados = "";
    let checkcategories = [];
    itemsCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkcategories.push(checkbox.value);
        }
    });
    console.log(checkcategories);

    let textoingresado = inputBusqueda.value.toLowerCase().trim();


    htmlResultados = Search(checkcategories,textoingresado);

    if (htmlResultados.length == 0) {
        htmlResultados += `<h4 class="text-muted">Búsqueda no encontrada</h4>`

    }

document.querySelector("#card").innerHTML = htmlResultados;
}

/*
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
*/