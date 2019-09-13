import $ from 'jquery';

export default {
  displayCurrentGuest(currentGuest) {
    $('#current-customer').text(currentGuest);
  }
}