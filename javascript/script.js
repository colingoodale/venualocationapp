function isZip(zip) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
}




$("#zipButton").on("click", function () {
    preventDefault();
    var zipCode = $("#zipBox").val();
    if (isZip(zipCode)) {
        // Do search function
    }
})