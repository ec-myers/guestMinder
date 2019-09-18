import $ from 'jquery';

export default {
  displayCurrentGuest(currentGuest) {
    $('#current-customer').text(currentGuest);
    $('#input-search-guest').val('');
    $('#error-search-guest').show();
    $('#error-search-guest').html(`The guest, ${currentGuest} was found.`);
    $('#error-search-guest').fadeOut(8000);
  },

  displaySearchError() {
    $('#input-search-guest').val('');
    $('#error-search-guest').show();
    $('#error-search-guest').html('This guest was not found. Please add them above.');
    $('#error-search-guest').fadeOut(6000);
  },


  displayAddedGuestMessage() {
    $('#input-add-guest').val('');
    $('#added-message-guest').show();
    $('#added-message-guest').html('This guest has been successfully added.');
    $('#added-message-guest').fadeOut(6000);
  },

  enableAddGuestButton() {
    $('#btn-add-guest').attr('disabled', false);
  },

  enableSearchGuestButton() {
    $('#btn-search-guest').attr('disabled', false);
  },

  displayTodaysInformation(todaysDate, availability, occupancy, revenue) {
    $('#current-date').text(todaysDate);
    $('#room-availability-today').text(availability);
    $('#occupancy-today').text(`${occupancy}%`);
    $('#total-revenue-today').text(`$${revenue}`);
  },

  displayAllOrders(orders) {
    orders.forEach(order => {
      let food = order.foodItems;
      let cost = order.totalCost;
      let item = $(`<li><h6>Item: ${food}<br>Cost: $${cost.toFixed(2)}</h6></li>`);
      $('.all-orders').append(item);
    });
  },

  displaySearchOrders(date, orders) {
    $('#search-orders-date').append($(`<h5>Orders for ${date}</h5>`));
    orders.forEach(order => {
      let food = order.foodItems;
      let cost = order.totalCost;
      let item = $(`<li><h6>${food}, $${cost.toFixed(2)}</h6></li>`);
      $('#search-orders').append(item);
    });
  },

  clearSearchOrders() {
    $('#search-orders-date').empty();
    $('#search-orders').empty();
  },

  displayMenu(food, cost) {
    let menuItems = $(`<option data-food='${food}' data-cost='${cost}'>${food} $${cost}</option>`);

    $('.list-menu-items').append(menuItems);
  },

  displayOrdersForGuest(guestOrders) {
    $('#list-order-history').html('');
    guestOrders.forEach(order => {
      let ordersList = $(`<li><h6>Date: ${order.date}<br>Item: ${order.foodItems}<br>Cost: $${order.totalCost.toFixed(2)} </h6></li>`);
      $('#list-order-history').append(ordersList);
    });
  },

  displayOrderTotalsForGuest(dayTotal, allTotal) {
    $('#order-charges-day').text(`$${dayTotal}`);
    $('#order-charges-total').text(`$${allTotal}`);
  },

  displayBookingsStats(most, least) {
    $('#most-popular-date').text(most);
    $('#least-popular-date').text(least);
  },

  enableCustomerButtons() {
    $('#btn-order-food').attr('disabled', false);
  },

  displayBookingsForGuest(guestBookings) {
    $('.list-guest-bookings').html('');
    guestBookings.forEach(booking => {
      let bookingsList = $(`<li><h6>Date: ${booking.date}<br> Room Number: ${booking.roomNumber}</h6></li>`);
      $('.list-guest-bookings').append(bookingsList);
    });
  },

  displayNewBookingForGuest(date, roomNumber) {
    let newBooking = $(`<li><h6>Date: ${date}<br> Room Number: ${roomNumber}</h6></li>`);
    $('.list-guest-bookings').append(newBooking);
  },

  displayAvailableRoomsByType(roomsByType, date) {
    roomsByType.forEach(room => {
      let roomsList = $(`<option data-date='${date}' data-number='${room.number}' data-type='${room.roomType}' data-numBeds='${room.numBeds}' data-bedSize='${room.bedSize}' data-bidet='${room.bidet}'>A ${room.roomType} with ${room.numBeds} ${room.bedSize} bed(s), has bidet: ${room.bidet}</option>`)
      $('#available-rooms').append(roomsList);
    });
  }
}