

var eventfulURL = "http://api.eventful.com/json/events/search?...&location=Chicago"

var eventfulCall =
    $.ajax({
        url: eventfulURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

function isZip(zip) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
}



$("#submit").on("click", function () {
    var zipCode = $("#zipBox").val();
    // alert("hello")
    if (isZip(zipCode)) {
        // Do search function
        console.log("That is a valid Zip Code");
        var card = $("<div>").addClass("card blue-grey darken-1");
        var cardContent = $("<div>").addClass("card-content white-text");
        card.append(cardContent);
        $("#cardContainer").append(card);

    } else {
        alert("Go Fuck Yourself");
    }
});


$(document).ready(function () {
    $('.datepicker').datepicker()
});

