import $ from 'jquery';

export default {
  displayCurrentGuest(currentGuest) {
    $('#current-customer').text(currentGuest);
  },

  // displayAllOrders() {
  //   $('#all-orders').text();
  // },

  displayTodaysInformation(todaysDate, orders) {
    $('#current-date').text(todaysDate);
    $('#all-orders').text(orders);
  }
}