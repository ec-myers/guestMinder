import $ from 'jquery';
import './css/base.scss';
import './images/suitcase.svg';
import './images/background-img.jpg';
import Hotel from './Hotel.js';
import domUpdates from './domUpdates.js';
import Chart from 'chart.js';
import Guest from './Guest';

let hotel;

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(data => data.json()), 
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(data => data.json()), 
  fetch ('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')  .then(data => data.json()), 
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices')
    .then(data => data.json())])
  .then(data => hotel = new Hotel(data[0].users, data[3].roomServices, data[2].bookings, data[1].rooms))
    .then(data => console.log(data))
    .then(data => hotel.start())

//hide and show tabs
$('.tabs-content div').hide();
$('.tabs-content div:first').show();
$('.tabs-nav li:first').addClass('tab-active');
  
// Change tab class and display content
$('.tabs-nav a').on('click', function (event) {
  event.preventDefault();
  $('.tabs-nav li').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-content div').hide();
  $($(this).attr('href')).show();
}); 

//guest tab ---------->
$('#input-add-guest').on('keyup', () => {
  domUpdates.enableAddGuestButton();
});

$('#input-search-guest').on('keyup', () => {
  domUpdates.enableSearchGuestButton();
});

$('#btn-add-guest').on('click', () => {
  let newGuestName = $('#input-add-guest').val();
  let newGuestId = hotel.findNextAvailableGuestId();
  let newGuest = hotel.createNewGuest(newGuestId, newGuestName);

  hotel.currentGuest = newGuest;
  domUpdates.displayCurrentGuest(newGuestName);
  domUpdates.enableCustomerButtons();
  domUpdates.displayAddedGuestMessage();
});

$('#btn-search-guest').on('click', () => {
  let inputSearchGuest = $('#input-search-guest').val();
  let foundSearchGuest = hotel.findGuestByName(inputSearchGuest);

  if (foundSearchGuest !== undefined) {
    hotel.currentGuest = foundSearchGuest;
    let bookings = hotel.currentGuest.bookings;
    let dayTotal = hotel.currentGuest.findGuestTotalForOrdersByDate(hotel.todaysDate);
    let allTotal = hotel.currentGuest.findGuestTotalForAllOrders(hotel.todaysDate).toFixed(2);

    domUpdates.displayCurrentGuest(foundSearchGuest.name);
    domUpdates.displayOrdersForGuest(hotel.currentGuest.orders);
    domUpdates.displayOrderTotalsForGuest(dayTotal, allTotal);
    domUpdates.displayBookingsForGuest(bookings);
    domUpdates.enableCustomerButtons();
  } else {
    domUpdates.displaySearchError();
  }
});

//order tab ------------>

$('#input-search-orders').on('keypress', () => {
  $('#btn-search-orders').attr('disabled', false);
});

$('#btn-clear-orders').on('click', () => {
  domUpdates.clearSearchOrders();
});

$('#btn-search-orders').on('click', () => {
  let inputSearchDate = $('#input-search-orders').val();
  let orders = hotel.findAllOrdersByDate(inputSearchDate);
  domUpdates.displaySearchOrders(inputSearchDate, orders);
  $('#input-search-orders').val('');
  $('#btn-search-orders').attr('disabled', true);
});

$('#btn-order-food').on('click', (e) => {
  e.preventDefault();
  let food = $('.list-menu-items').find(':selected').data('food');
  let cost = $('.list-menu-items').find(':selected').data('cost');
  console.log(hotel.todaysDate)
  hotel.currentGuest.createRoomServiceOrder(hotel.todaysDate, food, cost);
  let newTotal = hotel.currentGuest.findGuestTotalForAllOrders().toFixed(2);
  let dayTotal = hotel.currentGuest.findGuestTotalForOrdersByDate(hotel.todaysDate).toFixed(2);

  console.log(dayTotal)

  domUpdates.displayOrderTotalsForGuest(dayTotal, newTotal);
  domUpdates.displayOrdersForGuest(hotel.currentGuest.orders);

});

// rooms tab --------->

$('#btn-search-rooms').on('click', () => {
  let inputSearchDate = $('#input-search-rooms').val();
  let roomsAvailable = hotel.findRoomsAvailableByDate(inputSearchDate);
  
  domUpdates.displayAvailableRooms(roomsAvailable);
});

$('#input-available-rooms-date').on('keypress', () => {
  $('#room-types').attr('disabled', false);
});

$('#room-types').on('change', () => {
  $('#available-rooms').attr('disabled', false);
  let type = $('#room-types').find(':selected').val();
  let date = $('#input-available-rooms-date').val();
  let roomsByDate = hotel.findRoomsAvailableByDate(date);
  console.log(typeof (date), typeof (type))
  let roomsByType = hotel.filterRoomsByType(roomsByDate, type);
  console.log('date', roomsByDate)
  console.log('type', roomsByType)
  domUpdates.displayAvailableRoomsByType(roomsByType, date);
});

$('#available-rooms').on('change', () => {
  $('#btn-book-room').attr('disabled', false);
});

$('#btn-book-room').on('click', () => {
  $('#btn-book-room').attr('disabled', true);
  let date = $('#available-rooms').find(':selected').data('date');
  let roomNumber = $('#available-rooms').find(':selected').data('number')
  
  hotel.currentGuest.createBooking(date, roomNumber);
  domUpdates.displayNewBookingForGuest(date, roomNumber)
});

$('#btn-calculate-total').on('click', () => {
  let guest = hotel.currentGuest.name;
  // let guestBookings = hotel.currentGuest.bookings;
  let total = hotel.currentGuest.calculateTotalBill(hotel.todaysDate, hotel.rooms);
  console.log(total)

  domUpdates.displayGuestTotalBill(guest, total);
});


setTimeout(() => {
  Chart.defaults.global.defaultFontColor = 'black';
  const revenueChart = new Chart($('#revenue-chart'), {
    type: 'bar',
    data: {
      labels: ['dollars'],
      datasets: [{
        label: 'Today\'s Revenue',
        data: [hotel.calculateTotalRevenueByDate(hotel.todaysDate)],
        backgroundColor: [
          'rgba(255, 192, 141, 1)'
        ],
        borderColor: [
          'rgba(231, 144, 146, 1)'
        ],
        borderWidth: 3
      }]
    },
    options: {
      defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Roboto'",
      responsive: false,
      maintainAspectRatio: true,
      aspectRatio: 2,
      scales: {
        yAxes: [{
          gridLines: {
            display: true
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  const occupancyChart = new Chart($('#occupancy-chart'), {
    type: 'pie',
    data: {
      labels: ['Available Rooms', 'Booked Rooms'],
      datasets: [{
        label: 'Today\'s Occupancy',
        data: [hotel.findRoomsAvailableByDate(hotel.todaysDate).length, hotel.findRoomsBookedByDate(hotel.todaysDate).length],
        backgroundColor: [
          'rgba(231, 144, 146, .9)',
          'rgba(255, 192, 141, 1)',
        ],
        borderColor: [
          'rgba(231, 144, 146, .9)',
          'rgba(255, 192, 141, 1)',
        ],
        borderWidth: 3
      }]
    },
    options: {
      defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Roboto'",
      responsive: false,
      maintainAspectRatio: true,
      aspectRatio: 2,
      scales: {
        yAxes: [{
          gridLines: {
            display: true
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}, 500)