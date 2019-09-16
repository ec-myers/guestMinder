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
});

$('#btn-search-guest').on('click', () => {
  let inputSearchGuest = $('#input-search-guest').val();
  let foundSearchGuest = hotel.findGuestByName(inputSearchGuest);

  if (foundSearchGuest !== undefined) {
    domUpdates.displayCurrentGuest(foundSearchGuest.name);
    hotel.currentGuest = foundSearchGuest;
    domUpdates.displayOrdersForGuest(hotel.currentGuest.orders);
    let dayTotal = hotel.currentGuest.findGuestTotalForOrdersByDate(hotel.todaysDate);
    let allTotal = hotel.currentGuest.findGuestTotalForAllOrders(hotel.todaysDate);
    domUpdates.displayOrderTotalsForGuest(dayTotal, allTotal);
    console.log(hotel.currentGuest)
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

$('.list-menu-items').on('click', '.btn-order-food', (e) => {
  e.preventDefault();
  let food = $(e.target).closest('li').data('food');
  // let food = $('.list-menu-items').find('#btn-order-food').data('food');
  // let food = $('.btn-order-food').data('food');
  // let cost = $('.btn-order-food').data('cost');
  console.log(this.dataset.food, this.dataset.cost)
  console.log(hotel.currentGuest)
  hotel.currentGuest.createRoomServiceOrder(hotel.todaysDate, this.dataset.food, this.dataset.cost);
})

// rooms tab --------->

$('#btn-search-rooms').on('click', () => {
  let inputSearchDate = $('#input-search-rooms').val();
  let roomsAvailable = hotel.findRoomsAvailableByDate(inputSearchDate);

  domUpdates.displayAvailableRooms(roomsAvailable);
})
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