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


$('#main').on('click', () => {
  console.log(hotel.createMenu());

})


//guest tab ---------->

$('#btn-add-guest').on('click', () => {
  let newGuestName = $('#input-add-guest').val();
  let newGuestId = hotel.findNextAvailableGuestId();
  let newGuest = hotel.createNewGuest(newGuestId, newGuestName);

  hotel.currentGuest = newGuest;
  domUpdates.displayCurrentGuest(newGuestName);
  domUpdates.enableCustomerButtons();
});

$('#btn-search-guest').on('click', () => {
  let inputSearchGuest = $('#input-search-guest').val();
  let foundSearchGuest = hotel.findGuestByName(inputSearchGuest);

  if (foundSearchGuest !== undefined) {
    hotel.currentGuest = foundSearchGuest;
    let bookings = hotel.currentGuest.bookings;
    let dayTotal = hotel.currentGuest.findGuestTotalForOrdersByDate(hotel.todaysDate);
    let allTotal = hotel.currentGuest.findGuestTotalForAllOrders(hotel.todaysDate);

    domUpdates.displayCurrentGuest(foundSearchGuest.name);
    domUpdates.displayOrdersForGuest(hotel.currentGuest.orders);
    domUpdates.displayOrderTotalsForGuest(dayTotal, allTotal);
    domUpdates.displayBookingsForGuest(bookings);
    domUpdates.enableCustomerButtons();
    console.log(hotel.currentGuest)
  } else {
    domUpdates.displaySearchError();
  }
});

// function displayCurrentGuest() {
//   let guestBookings = hotel.currentGuest.bookings;
//   domUpdates.displayBookingsForGuest(guestBookings);
// }

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
  let newTotal = hotel.currentGuest.findGuestTotalForAllOrders();
  let dayTotal = hotel.currentGuest.findGuestTotalForOrdersByDate(hotel.todaysDate);

  hotel.currentGuest.createRoomServiceOrder(hotel.todaysDate, food, cost);
  domUpdates.displayOrderTotalsForGuest(dayTotal, newTotal);
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
  let type = $('#room-types').find(':selected').val();
  let date = $('#input-available-rooms-date').val();
  let roomsByDate = hotel.findRoomsAvailableByDate(date);
  console.log(typeof (date), typeof (type))
  let roomsByType = hotel.filterRoomsByType(roomsByDate, type);
  console.log('date', roomsByDate)
  console.log('type', roomsByType)
$('#available-rooms').attr('disabled', false);
  domUpdates.displayAvailableRoomsByType(roomsByType, date);
});

$('#btn-book-room').on('click', () => {
  console.log(hotel.currentGuest.bookings)

  let date = $('#available-rooms').find(':selected').data('date');
  let roomNumber = $('#available-rooms').find(':selected').data('number')

  hotel.currentGuest.createBooking(date, roomNumber);
  console.log(hotel.currentGuest.bookings)
  domUpdates.displayNewBookingForGuest(date, roomNumber)
});
// setTimeout(() => {
// var ctx = $('#revenue-chart');
// var todaysRevenue = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: [hotel.todaysDate],
//     datasets: [{
//       label: 'dollars',
//       data: hotel.calculateTotalRevenueByDate(hotel.todaysDate),
//       backgroundColor: [
//         'rgb(221, 160, 221, 1)',
//       ],
//       borderColor: [
//         'rgba(221, 160, 221, 1)',
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     legend: {
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });  
// }, 1000)