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

