$(document).ready(function() {

    if (location.pathname === "/mdinvest/" || location.pathname === "/mdinvest") {
        $('.learn-link').addClass('invest-selected');
    } else if (location.pathname === "/mdinvest/register" || location.pathname === "/mdinvest/register/") {
        
        $('.sub-link').addClass('invest-selected');
    } else {
        $('.doc-link').addClass('invest-selected');
    }

    if (location.pathname === "/mdcontributor/" || location.pathname === "/mdcontributor") {
        $('.learn-link').addClass('invest-selected');
    } else if (location.pathname === "/mdcontributor/register" || location.pathname === "/mdcontributor/register/") {
        
        $('.sub-link').addClass('invest-selected');
    } else {
        $('.doc-link').addClass('invest-selected');
    }


})