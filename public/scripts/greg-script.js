$(document).ready(function() {
    if (location.pathname === "/mdinvest/" || location.pathname === "/mdinvest") {
        $('.learn-link').addClass('invest-selected');
    } else if (location.pathname === "/mdinvest/register" || location.pathname === "/mdinvest/register/") {
        
        $('.sub-link').addClass('invest-selected');
    } else {
        $('.doc-link').addClass('invest-selected');
        
    }
})