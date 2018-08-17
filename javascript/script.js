$("#zipButton").on("click", function () {
    preventDefault();
    var zipCode = $("#zipBox").val();
    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode)) {
        // Do search function
        console.log("That is a valid Zip Code")
    }
})