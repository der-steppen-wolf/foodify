$(document).ready(function () {
    var fullpath = window.location.pathname;
    var currentLink = $('a[href="' + fullpath + '"]');
    currentLink.addClass("active");
});
