var url = "http://api.openweathermap.org/data/2.5/weather?q=60601,us&APPID=02d2f765636f52e60b1ca124cabb9386&units=imperial"
$.ajax({
    method: "GET",
    url: url,
}).then(function (mapData) {
    console.log(mapData.main.temp);
    $(".right").append(" Current Temp: " + mapData.main.temp + "ºF");
});


var database = firebase.database();
console.log(database.ref());
var datacopy;

function isZip(zip) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
}

function fork() {
    database.ref().on("value", function (snapshot) {
        console.log(snapshot.val());
        datacopy = snapshot.val();
    })

}

fork();

function populateCard(information) {
    var card = $("<div>").addClass("card light-blue darken-3");
    var cardContent = $("<div>").addClass("card-content white-text");
    var cardSpan = $("<span>").addClass("card-title white-text").text(information.name);
    //var cardSpan2 = $("<span>").addClass("card-title white-text").text("@ " + information.locationName);
    var eventInfo = $("<div>").addClass("white-text").append(
        `<p>Sign-up starts at ${information.signUpTime}</p>
        <p>Show starts at ${information.startTime}</p>
        <p>Every ${information.day} at ${information.locationName}</p>
        <p>${information.address}</p>
        `
    );

    card.append(cardContent);
    cardContent.append(cardSpan);
    //cardContent.append(cardSpan2);
    cardContent.append(eventInfo);

    $("#cardContainer").append(card);
}

$("#submit2").on("click", function (event) {
    event.preventDefault();
    $("#cardContainer").empty();

    var searchTerm = $("#fireBox").val();
    var searchSelector = $("#fireSelector").val();
    console.log(searchSelector);

    if (searchTerm === "" || searchSelector === null) {
        for (var item in datacopy) {
            if (datacopy[item].day.toLowerCase().includes("monday")) {
                populateCard(datacopy[item]);
            }
        }
    }
    else if (!searchSelector.includes("artist")) {
        for (var item in datacopy) {
            if (datacopy[item][searchSelector].toLowerCase().includes(searchTerm.toLowerCase())) {
                populateCard(datacopy[item]);
            }
        }
    }
    else {
        var artistName = $("#fireBox").val();
        console.log(artistName);
        $.ajax('https://api.bandsintown.com/artists/' + artistName + '/events.json', {
            data: {
                api_version: '2.0',
                app_id: 'f073da9fd80bafdfb67ab82c022d6798'
            },
            dataType: 'jsonp',
            jsonpCallback: 'createConcertList',
            crossDomain: true
        })

        window.createConcertList = function (res) {
            var concerts = res.sort(function (a, b) {
                return new Date(b.datetime) - new Date(a.datetime)
            })

            var $container = $('.concerts-list')

            $('<h4 class="title">All Concerts</h4>').appendTo($container)
            var $table = $('<table class="list" />')
            $table.append('<tr><th></th><th>Date</th><th>Venue</th><th>Location</th></tr>')

            $.each(concerts, function (i, concert) {
                var date = concert.datetime.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)
                var dateString = date[3] + '.' + date[2] + '.' + date[1]
                var card = $("<div>").addClass("card light-blue darken-5 hoverable");
                var cardContent = $("<div>").addClass("card-content white-text");
                var eventImage = $("<img height=100px width=100px>").addClass("responsive-image").attr("src", concerts[i].artists[0].image_url);
                var eventLocation = $("<p>").addClass("white-text").text(concerts[i].formatted_location);
                var eventTime = $("<p>").addClass("white-text").text(concerts[i].formatted_datetime);
                var cardSpan = $("<span>").addClass("card-title white-text").text(concerts[i].artists[0].name);
                var ticketButton = $("<button>").addClass("white-text");
                var buttonAnchor = $("<a>").attr("href", concerts[i].ticket_url).attr("target", "_blank").text("Tickets");
                var ticketAvailable = $("<p>").addClass("card-title white-text").text("Ticket Availability: " + concerts[i].ticket_status);
                var eventInfo = $("<p>").addClass("white-text").text("Venue Info: " + concerts[i].description);
                eventLocation.append(" ", eventTime);
                ticketButton.append(buttonAnchor);
                cardSpan.append(eventLocation);
                card.append(cardContent);
                card.prepend(cardSpan);
                card.append(eventImage);
                //card.append(eventLocation);
                card.append(ticketAvailable);
                card.append(ticketButton);
                card.append(eventInfo);

                console.log(concerts);

                $("#cardContainer").append(card);
            })
        }
    }


});

// $("#submit1").on("click", function (event) {
//     $("#cardContainer").empty();
//     event.preventDefault();

//     var artistName = $("#nameBox").val();
//     console.log(artistName);
//     $.ajax('https://api.bandsintown.com/artists/' + artistName + '/events.json', {
//         data: {
//             api_version: '2.0',
//             app_id: 'f073da9fd80bafdfb67ab82c022d6798'
//         },
//         dataType: 'jsonp',
//         jsonpCallback: 'createConcertList',
//         crossDomain: true
//     })

//     window.createConcertList = function (res) {
//         var concerts = res.sort(function (a, b) {
//             return new Date(b.datetime) - new Date(a.datetime)
//         })

//         var $container = $('.concerts-list')

//         $('<h4 class="title">All Concerts</h4>').appendTo($container)
//         var $table = $('<table class="list" />')
//         $table.append('<tr><th></th><th>Date</th><th>Venue</th><th>Location</th></tr>')

//         $.each(concerts, function (i, concert) {
//             var date = concert.datetime.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)
//             var dateString = date[3] + '.' + date[2] + '.' + date[1]
//             var card = $("<div>").addClass("card light-blue darken-3 hoverable");
//             var cardContent = $("<div>").addClass("card-content white-text");
//             var eventImage = $("<img width=150px height=150px>").attr("src", concerts[i].artists[0].image_url);
//             var eventLocation = $("<p>").addClass("white-text right").text(concerts[i].formatted_location);
//             var eventTime = $("<p>").addClass("white-text right").text(concerts[i].formatted_datetime);
//             var cardSpan = $("<span>").addClass("card-title white-text").text(concerts[i].artists[0].name);
//             var ticketButton = $("<button>").addClass("white-text");
//             var buttonAnchor = $("<a>").attr("href", concerts[i].ticket_url).attr("target", "_blank").text("Tickets");
//             var ticketAvailable = $("<p>").addClass("card-title white-text").text(concerts[i].ticket_status);
//             var eventInfo = $("<p>").addClass("white-text").text(concerts[i].description);
//             eventLocation.append(" ", eventTime);
//             ticketButton.append(buttonAnchor);
//             card.append(cardContent);
//             card.prepend(cardSpan);
//             card.append(eventImage);
//             card.append(eventLocation);
//             card.append(ticketAvailable);
//             card.append(ticketButton);
//             card.append(eventInfo);

//             console.log(concerts);

//             $("#cardContainer").append(card);
//         })
//     }
// });


$(document).ready(function () {
    $('.datepicker').datepicker()
    $('select').formSelect();
});


var url = "http://api.openweathermap.org/data/2.5/weather?q=60601,us&APPID=02d2f765636f52e60b1ca124cabb9386&units=imperial"
$.ajax({
    method: "GET",
    url: url,
}).then(function (mapData) {
    console.log(mapData);
});