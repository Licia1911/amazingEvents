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