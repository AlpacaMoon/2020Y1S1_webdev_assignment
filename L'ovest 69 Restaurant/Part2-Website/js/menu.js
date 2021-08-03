/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Thong So Xue
    Filename:       menu.js

    Function:   Displays an error message when user presses 'Enter' when focusing at the search bar. 
                Hover animation for the five sectors at slide2.
*/

// Run after the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Display error message for the search bar not being implemented yet
    searchBarError();

    // Hover animation for the five sectors at slide2.
    circleDishes();

});

// Display error message for the search bar not being implemented yet
function searchBarError() {
    var searchBar = document.querySelector('#searchDishField');
    searchBar.addEventListener('keyup', function onEvent(e) {
        if (e.keyCode == 13) 
            alert('The search feature is not implemented yet. \nWe\'re very sorry for the inconvenience, do sure to check back later when the site is updated. ')
    })
}

// Hover animation for the five sectors at slide2.
function circleDishes() {

    var plateDishes = document.querySelectorAll("#plate-container img");

    plateDishes.forEach(el => {
        /* Get hovering White text */
        var next = el.nextElementSibling;

        /* Show hover text when mouse hover */
        el.addEventListener("mouseover", function () {
            next.style.opacity = "1";
            next.classList.add("plateHover");
        });
        /* Hide hover text when mouse leave */
        el.addEventListener("mouseout", function () {
            next.style.opacity = "0";
            next.classList.remove("plateHover");
        });


        /* Delay Href Link Jumping to allow animation to play */
        el.addEventListener("click", function () {
            /* Click Animation */
            el.classList.add("clickActive");
            setTimeout(function () {
                el.classList.remove("clickActive");
            }, 200);

            /* Delay Href Link Jumping */
            event.preventDefault();
            var hrefLink = el.parentElement.getAttribute("href");
            setTimeout(function () {
                window.location.href = hrefLink;
            }, 1300);


            /* Play Outro Animation */
            var logo = document.querySelector('#navLogo');
            var pgTrans = document.querySelector('#page-transition');

            setTimeout(function () {
                pgTrans.classList.remove("upped");
                pgTrans.classList.add("downed");
            }, 300);

            setTimeout(function () {
                logo.classList.remove("pageTop");
                logo.classList.add("pageCenterOut");
            }, 350);

            setTimeout(function () {
                document.querySelectorAll("body:not(#page-transition)").forEach(el => {
                    el.style.visibility = "hidden";
                })
            }, 500);
        });
    });
}