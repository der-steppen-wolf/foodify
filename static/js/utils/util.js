$(document).ready(function () {
    // Set active navbar link class to active
    var fullpath = window.location.pathname;
    var currentLink = $('a[href="' + fullpath + '"]');
    currentLink.addClass("active");
});
