import $ from 'jquery';

export default {
  displayCurrentGuest(currentGuest) {
    $('#current-customer').text(currentGuest);
  },

  displaySearchError() {
    $('#error-search-guest').show();
    $('#error-search-guest').html('This guest was not found. Please add them above.');
    $('#error-search-guest').fadeOut(8000);
  },
  // displayAllOrders() {
  //   $('#all-orders').text();
  // },

  displayTodaysInformation(todaysDate, orders, availability, occupancy, revenue) {
    $('#current-date').text(todaysDate);
    $('#all-orders').text(orders);
    $('#room-availability-today').text(availability)
    $('#occupancy-today').text(occupancy);
    $('#total-revenue-today').text(revenue);
  },

  displaySearchOrders(orders) {
    $('#search-orders').text(orders);
  },

  displayMenu(food, cost) {
    let menuItems = $(`<li><button class='btn-order-food' data-food='${food}' data-cost='${cost}'>Place Order</button><h5>${food} $${cost}</h5></li><br>`);
    $('.list-menu-items').append(menuItems);
  },

}