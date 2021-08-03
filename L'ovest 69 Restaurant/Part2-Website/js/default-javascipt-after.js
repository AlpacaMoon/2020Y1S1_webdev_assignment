/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Thong So Xue
    Filename:       default-javascript-after.js

    Function:   Change the tooltip text at the footer according to which icon is hovering. 
*/

// Get the tooltip text, tooltip cover, & the footer icons
var mediaTooltip = document.querySelector("#mediaTooltip");
var mediaCover = document.querySelector("#mediaTooltipCover");
var footerIcons = document.querySelectorAll(".footerIcons img");

/* Change Tooltip Text Based on Hovered */
function tooltipHover(input) {
    mediaTooltip.innerHTML = input;
};

/* Reveal Tooltip on mouseenter */
footerIcons.forEach(el => {
    el.addEventListener("mouseenter", function () {
        if (window.innerWidth > 768) {
            mediaCover.style.right = "200px";
        }
        else if (window.innerWidth <= 768) {
            el.classList.add('hovered');
        }
    });
});

/* Hide tooltip on mouseleave */
footerIcons.forEach(el => {
    el.addEventListener("mouseleave", function () {
        if (window.innerWidth > 768) {
            mediaCover.style.right = "0";
        }
        else if (window.innerWidth <= 768) {
            el.classList.remove('hovered');
        }
    });
});

