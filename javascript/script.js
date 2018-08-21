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

        // for (var item in datacopy) {
        //     console.log(datacopy[item].host);
        // }
    })

}

// database.ref(snapshot)
// snapshot.val
// for in 

fork();

function populateCard(information) {
    console.log("That is a valid Zip Code");
    var card = $("<div>").addClass("card light-blue darken-3");
    var cardContent = $("<div>").addClass("card-content white-text");
    var cardSpan = $("<span>").addClass("card-title white-text").text(information);
    var eventInfo = $("<p>").addClass("white-text").text("This is where the info description goes.");
    card.append(cardContent);
    card.append(cardSpan);
    card.append(eventInfo);

    $("#cardContainer").append(card);
}

$("#submit").on("click", function (event) {
    event.preventDefault();
    var zipCode = $("#zipBox").val();
    // alert("hello")
    if (isZip(zipCode)) {
        // Do search function
        // console.log("That is a valid Zip Code");
        // var card = $("<div>").addClass("card light-blue darken-3");
        // var cardContent = $("<div>").addClass("card-content white-text");
        // var cardSpan = $("<span>").addClass("card-title white-text").text("Test");
        // var eventInfo = $("<p>").addClass("white-text").text("This is where the info description goes.");
        // card.append(cardContent);
        // card.append(cardSpan);
        // card.append(eventInfo);

        // $("#cardContainer").append(card);
        for (var item in datacopy) {
            populateCard(datacopy[item].name);
        }

    } else {
        alert("Please enter a valid zip code.");
    }
});

$("#submit2").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#fireBox").val();
    var searchSelector = $("#fireSelector").val();


    for (var item in datacopy) {
        if (datacopy[item][searchSelector].toLowerCase().includes(searchTerm.toLowerCase())) {
            populateCard(datacopy[item].name);
        }
    }


});

$("#submit1").on("click", function (event) {
    event.preventDefault();
    var artistName = $("#nameBox").val();
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
            var card = $("<div>").addClass("card light-blue darken-3");
            var cardContent = $("<div>").addClass("card-content white-text");
            var eventImage = $("<img width=100px height=100px>").attr("src", concerts[i].artists[0].image_url);
            var cardSpan = $("<span>").addClass("card-title white-text").text(concerts[i].artists[0].name);
            var eventInfo = $("<p>").addClass("white-text").text(concerts[i].description);
            card.append(cardContent);
            card.append(eventImage);
            card.append(cardSpan);
            card.append(eventInfo);

            console.log(concerts[i].id);

            $("#cardContainer").append(card);
        })
    }
});


$(document).ready(function () {
    $('.datepicker').datepicker()
    $('select').formSelect();
});



