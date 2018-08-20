function isZip(zip) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
}


$("#submit").on("click", function () {
    var zipCode = $("#zipBox").val();
    // alert("hello")
    if (isZip(zipCode)) {
        // Do search function
        console.log("That is a valid Zip Code");
        var card = $("<div>").addClass("card light-blue darken-3");
        var cardContent = $("<div>").addClass("card-content white-text");
        var cardSpan = $("<span>").addClass("card-title white-text").text("Test");
        var eventInfo = $("<p>").addClass("white-text").text("This is where the info description goes.");
        card.append(cardContent);
        card.append(cardSpan);
        card.append(eventInfo);

        $("#cardContainer").append(card);

    } else {
        alert("Please enter a valid zip code.");
    }
});


$(document).ready(function () {
    $('.datepicker').datepicker()
    $('select').formSelect();
});

artist = 'Beyonce'

$.ajax('https://api.bandsintown.com/' + artist + '/Roosevelt/events.json', {
    data: {
        api_version: '2.0',
        app_id: 'ENTER_APPID_HERE'
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

    $.each(concerts, function (index, concert) {
        var date = concert.datetime.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)
        var dateString = date[3] + '.' + date[2] + '.' + date[1]
        var $tr = $('<tr />')
        $tr.append($('<td class="spacer" />'))
        $tr.append($('<td class="date" />').text(dateString))
        $tr.append($('<td class="venue" />').text(concert.venue.name))
        $tr.append($('<td class="location" />').text(concert.venue.city + ', ' + concert.venue.country))
        $table.append($tr)
    })

    $container.append($table)
}

