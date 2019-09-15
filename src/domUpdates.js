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

  displayTodaysInformation(todaysDate, orders) {
    $('#current-date').text(todaysDate);
    $('#all-orders').text(orders);
  },

  displaySearchOrders(orders) {
    $('#search-orders').text(orders);
  }

}