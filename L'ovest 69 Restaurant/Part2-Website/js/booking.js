/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Wang Shu Wei
    Filename:       booking.js

    Function:   Disable the input bar of 'otherType' when selecting the choice of event type rather than 'other'. 
*/


/* When select 'other' for event type, the textbox with be able to enter */
document.getElementById("specialEvent").onclick = turnOffOtherInput;
document.getElementById("corporateEvent").onclick = turnOffOtherInput;
document.getElementById("socialEvent").onclick = turnOffOtherInput;
document.getElementById("other").onclick = turnOnOtherInput;

function turnOffOtherInput() {
    document.getElementById("otherType").disabled=true;
}

function turnOnOtherInput() {
    document.getElementById("otherType").disabled=false;
}