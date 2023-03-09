let htmlEvents = "";
let card = document.getElementById("card");

let currentDate = new Date(data.currentDate);
for (let event of data.events) {
    let eventDate = new Date(event.date);
    if (eventDate > currentDate) {
        htmlEvents += createCard(event);
    };
};

card.innerHTML = htmlEvents;

let checkbox = document.getElementById("checkbox");
let HTMLhome = "";
let cardsearch = [];
for (let category of categories) {
    HTMLhome += crearCheckbox(category);
}

checkbox.innerHTML = HTMLhome;

let itemsCheckboxes = document.querySelectorAll(".form-check-input");
console.log(itemsCheckboxes);

itemsCheckboxes.forEach(checkbox => checkbox.onchange = () => {
    let HTMLresultados = "";
    let categories = [];
    itemsCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            categories.push(checkbox.value);

        }

    });

    console.log(categories);

    if (categories.length > 0) {
        data.events.filter(event => categories.includes(event.category)).forEach(event => { HTMLresultados += createCard(event) });

        console.log(HTMLresultados);


    } else {
        data.events.forEach(event => { HTMLresultados += createCard(event) });
    }

    document.querySelector('div.events').innerHTML = HTMLresultados;

});