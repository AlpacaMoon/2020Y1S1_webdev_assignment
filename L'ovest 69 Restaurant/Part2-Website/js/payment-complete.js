/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Thong So Xue
    Filename:       payment-complete.js

    Function:   Download the cached input info of the customer and update it to the respective receipts section. 
                Download the bought items and update it to the respective receipts section. 
*/

// Run after the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Download the cached input info of the customer and update it to the respective receipts section. 
    importBoughtDetails();

    // Download the bought items and update it to the respective receipts section. 
    importBoughtItems();

});

// Download the cached input info of the customer and update it to the respective receipts section. 
function importBoughtDetails() {

    // Import the inputted details
    var boughtDetails = JSON.parse(sessionStorage.getItem('bought-details-cache'));
    var name, address, date;
    Object.entries(boughtDetails).forEach(el => {
        if (el[0] == 'name') {name = el[1]}
        if (el[0] == 'address') {address = el[1]}
        if (el[0] == 'date') {date = el[1]}
    });

    // Update the details to the respective elements
    document.querySelector('#custDetails #custName').textContent = name;
    document.querySelector('#custDetails #payDate').textContent = date;
    document.querySelector('#custDetails #custAddress').textContent = address;
}

// Download the bought items and update it to the respective receipts section. 
function importBoughtItems() {

    // Import the bought items
    var boughtItems = JSON.parse(sessionStorage.getItem('bought-items-cache'));
    // Default the subtotal to zero
    var subtotal = 0;

    // For each item bought
    boughtItems.forEach(entry => {
        var arr = Object.entries(entry);
        var itemName, itemPrice, itemQuantity;
        // Get their name, price and quantity
        arr.forEach(el => {
            if (el[0] == 'name') { itemName = el[1] }
            if (el[0] == 'price') { itemPrice = el[1] }
            if (el[0] == 'quantity') { itemQuantity = el[1] }
        })

        // Calculate the subtotal for each item and overall subtotal of all items
        var itemSubtotal = itemPrice * itemQuantity;
        subtotal = subtotal + itemSubtotal;

        // Append a new row to the receipts table containing the information
        var newItem = document.createElement('TR');
        newItem.innerHTML = `
            <td>${itemName}</td>
            <td>$${itemPrice.toFixed(2)}</td>
            <td>${itemQuantity}</td>
            <td>$${itemSubtotal.toFixed(2)}</td>
        `
        document.querySelector("#receiptDetails tbody").appendChild(newItem);
    });

    // Calculate the totals details
    var deliveryFee = 5.00;
    var tax = ((subtotal + deliveryFee) * 0.06).toFixed(2);
    var total = subtotal + deliveryFee + parseFloat(tax);

    // Update the totals details
    document.querySelector('#receiptDetails #subtotal').textContent = '$' + subtotal.toFixed(2);
    document.querySelector('#receiptDetails #deliveryFee').textContent = '$' + deliveryFee.toFixed(2);
    document.querySelector('#receiptDetails #tax').textContent = '$' + tax;
    document.querySelector('#receiptDetails #total').textContent = '$' + total.toFixed(2);
}