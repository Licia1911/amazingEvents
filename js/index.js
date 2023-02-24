let htmlEvents = "";
let card = document.getElementById("card");

for (let event of data.events) {
    htmlEvents += createCard(event);
};

card.innerHTML = htmlEvents;
