import $ from 'jquery';
import Guest from './Guest';

export default {
  displayCurrentGuest(currentGuest) {
    $('#current-customer').text(currentGuest);
  },

  displaySearchError() {
    $('#error-search-guest').show();
    $('#error-search-guest').html('This guest was not found. Please add them above.');
    $('#error-search-guest').fadeOut(8000);
  },

  displayTodaysInformation(todaysDate, availability, occupancy, revenue) {
    $('#current-date').text(todaysDate);
    $('#room-availability-today').text(availability);
    $('#occupancy-today').text(occupancy);
    $('#total-revenue-today').text(revenue);
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
    console.log(guestOrders)
    guestOrders.forEach(order => {
    let ordersList = $(`<li><h6>${order.date}, ${order.foodItems}, $${order.totalCost.toFixed(2)} </h6></li>`);

    console.log(ordersList)
      $('#list-order-history').append(ordersList)
    });
  },

  displayOrderTotalsForGuest(dayTotal, allTotal) {
    $('#order-charges-day').text(dayTotal);
    $('#order-charges-total').text(allTotal);
  },

  displayBookingsStats(most, least) {
    $('#most-popular-date').text(most);
    $('#least-popular-date').text(least);
  },

  displayAvailableRooms(roomsData) {
    roomsData.forEach(room => {
      $('.tbody-available-rooms').append(
        `<tr class="pointer" id=rooms-${room.number}>
            <td id="num">${room.number}</td>
            <td id="type">${room.type}</td>
            <td id="bidet">${room.bidet}</td>
            <td id="bedSize">${room.bedSize}</td>
            <td id="numBeds">${room.numBeds}</td>
            <td id="costPerNight">$${room.costPerNight}</td>
          </tr>`
      );
    });
  },

  enableCustomerButtons() {
    $('#btn-order-food').attr('disabled', false);
  },

  displayBookingsForGuest(guestBookings) {
    $('.list-guest-bookings').html('');
    console.log(guestBookings)
    guestBookings.forEach(booking => {
      let bookingsList = $(`<li><h6>Date: ${booking.date}<br> Room Number: ${booking.roomNumber}</h6></li>`)
      $('.list-guest-bookings').append(bookingsList);
    });
  },

  displayAvailableRoomsByType(roomsByType) {
    roomsByType.forEach(room => {
      let roomsList = $(`<li><h6>Type: ${room.type}<br> Number of Beds: ${room.numBeds} Bed Size: ${room.bedSize} Bidet: ${room.bidet}</h6></li>`)
      $('.list-guest-bookings').append(roomsList);
    });
  }
}