/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Thong So Xue
    Filename:       payment-formBox.js

    Function:   Give the same functionality to the custom submit button with the form submit button, by linking the former to the latter.
                Don't show the invalid CSS properties until user had focused at least once
                Add a prefix '+60' to the contact no. field when being focused
*/

// Run after the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Don't show the invalid CSS properties until user had focused at least once
    focusThenInvalid();

    // Add a prefix '+60' to the contact no. field when being focused
    custTelFieldFocus();
    
})

// Give the same functionality to the custom submit button with the form submit button, by linking the former to the latter.
function paymentFormSubmission() {
    event.preventDefault();
    document.querySelector('#slide2-sub2 #submit-form-btn').click();    // Link to the form submit button
}

// Don't show the invalid CSS properties until user had focused at least once
function focusThenInvalid() {
    document.querySelectorAll('#formBoxContent input, #formBoxContent textarea, #formBoxContent select').forEach(el => {
        el.addEventListener('blur', function () {
            el.classList.add('blurred');
        });
    });
}

// Add a prefix '+60' to the contact no. field when being focused
function custTelFieldFocus() {
    var telBox = document.querySelector('#custTelField');
    telBox.addEventListener('focus', function () {
        if (telBox.value == '') {
            telBox.value = '+60'
        }
    });
}
