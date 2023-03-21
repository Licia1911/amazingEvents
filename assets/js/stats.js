let stats = "";
let pastEventsList = [];

for (let event of data.events) {
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);

    if (eventDate < currentDate) {
        pastEventsList.push(event);
    }
}

console.log(pastEventsList);

let eventsStats = document.getElementById("eventsStats");

async function getEventsStats() {

    let tBodyHTML = "";

    tBodyHTML += `<tr>
        <td>${getBigger().name}</td>
        <td>${getSmaller().name}</td>
        <td>${getLarger().name} </td>
    </tr>`;

    eventsStats.innerHTML = tBodyHTML;

};

getEventsStats();

function getBigger(pastevents) {
    return pastEventsList.reduce((bigger, current) => {
        if ((current.assistance / current.capacity) > (bigger.assistance / bigger.capacity)) {
            return current;
        } else {
            return bigger;
        }
    });
};

function getSmaller(pastevents) {
    return pastEventsList.reduce((smaller, current) => {
        if ((current.assistance / current.capacity) < (smaller.assistance / smaller.capacity)) {
            return current;
        } else {
            return smaller;
        }
    });
};

function getLarger(events) {
    return data.events.reduce((larger, current) => {
        if (current.capacity > larger.capacity) {
            return current;
        } else {
            return larger;
        }
    });
};



// UPCOMING EVENTS

let upcominglist = [];

for (let event of data.events) {

    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);

    if (eventDate > currentDate) {
        upcominglist.push(event);
    }
};

let bodyUpcoming = document.getElementById("upcomingTable");

async function getUpcomingEvents() {

    let tBodyHTML = "";
    categories.forEach(category => {

        let filteredEvents = getEventsByCategory(category, upcominglist)
        let revenues = Revenues(filteredEvents);
        let persentageAttendance = PersentageAttendance(filteredEvents);


        tBodyHTML += `<tr>
        <td>${category}</td>
        <td>${revenues}</td>
        <td>${persentageAttendance} </td>
    </tr>`;

    });

    bodyUpcoming.innerHTML = tBodyHTML;

}

getUpcomingEvents();


//PAST EVENTS

let bodyPast = document.getElementById("pastTable");

async function getPastEvents() {

        let tBodyHTML = "";
        categories.forEach(category => {

            let filteredEvents = getEventsByCategory(category,pastEventsList);
            let revenues = Revenues(filteredEvents);  
            let persentageAttendance = PersentageAttendance(filteredEvents);

            tBodyHTML += `<tr>
            <td>${category}</td>
            <td>${revenues}</td>
            <td>${persentageAttendance} </td>
        </tr>`;
        });

        bodyPast.innerHTML = tBodyHTML;

    }

getPastEvents();


function getEventsByCategory(category,events) {
    return events.filter(event => {
        if (event.category.includes(category)) {
            return true;
        } else {
            return false;
        }
    });
}


function Revenues(events) {
    let sumarGanancias = 0;
    events.forEach(event => {
        if (event.assistance != null) {
            sumarGanancias += (event.price * event.assistance);
        } else {
            sumarGanancias += (event.price * event.estimate);
        }
    })
    return sumarGanancias;

}

function PersentageAttendance(events) {
    let sumarAssistance = 0;
    let sumarCapacity = 0

    events.forEach(event => {
        if (event.assistance != null) {
            (sumarAssistance += event.assistance) && (sumarCapacity += event.capacity)
        } else {
            (sumarAssistance += event.estimate) && (sumarCapacity += event.capacity)
        }
    })
    //console.log(sumarAssistance);
    //console.log(sumarCapacity);
    if(sumarCapacity === 0){
        return "Sin datos"
    }
    return Math.round((sumarAssistance / sumarCapacity) * 100) + "%";


}

