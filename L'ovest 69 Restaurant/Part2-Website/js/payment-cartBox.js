/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Thong So Xue
    Filename:       payment-cartBox.js

    Function:   Update the cart totals section when any value is changed. (eg: quantity, removing an item)
*/

// Run after the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Update the cartBox totals section
    updateCartBoxTotal();

    // Runs when any value in the cartBox section is changed (eg: quantity, removing an item)
    cartBoxValueChanged();
    
});

// Update the cartBox totals section
function updateCartBoxTotal() {
    // Get cartBox totals section elements
    var totalNotax = document.querySelector('#cartBox-totals-section #cartBox-total-notax span');
    var deliveryFee = parseFloat(document.querySelector('#cartBox-totals-section #cartBox-delivery-fee span').textContent);
    var totalGST = document.querySelector('#cartBox-totals-section #cartBox-tax span');
    var totalTaxed = document.querySelector('#cartBox-totals-section #cartBox-total-taxed span');

    // Get the original cart total
    var subtotals = parseFloat(document.querySelector('#cart-checkout #total span').textContent).toFixed(2);

    // Calculate and update each total details
    totalNotax.textContent = subtotals;
    totalGST.textContent = ((parseFloat(subtotals) + deliveryFee) * 0.06).toFixed(2);
    totalTaxed.textContent = ((parseFloat(subtotals) + deliveryFee) * 1.06).toFixed(2);

    // Update the totals displayed at the submit button
    var s3Total = document.querySelector('#slide2-sub3 #submit-total span:nth-of-type(2)');
    s3Total.textContent = totalTaxed.textContent;
}

// Runs when any value in the cartBox section is changed (eg: quantity, removing an item)
function cartBoxValueChanged() {
    // When clicked on quantity [+/-] buttons or deleted an item
    document.querySelectorAll('.count-btn-minus, .count-btn-plus, .cart-item-del').forEach(el => {
        el.addEventListener('click', function () {
            updateCartBoxTotal();
        })
    })
    // When manually input a number in the quantity field
    document.querySelectorAll('.count-field').forEach(el => {
        el.addEventListener('change', function () {
            updateCartBoxTotal();
        })
    })
}