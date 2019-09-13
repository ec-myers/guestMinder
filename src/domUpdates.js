import $ from 'jquery';

export default {
  displayCurrentGuest(currentGuest) {
    $('#current-customer').text(currentGuest);
  },

  displayTodaysDate(todaysDate) {
    $('#current-date').text (todaysDate);
  }
}