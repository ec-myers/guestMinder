import $ from 'jquery';
import './css/base.scss';
import './images/suitcase.svg';
import './images/background-img.jpg';
import Hotel from './Hotel';
import domUpdates from './domUpdates';

let hotel;

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(data => data.json()), 
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(data => data.json()), 
  fetch ('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')  .then(data => data.json()), 
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices')
    .then(data => data.json())])
  .then(data => hotel = new Hotel(data[0].users, data[3].roomServices, data[1].rooms, data[2].bookings))
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
  } else {
    domUpdates.displaySearchError();
  }
});

//order tab ------------>

$('#btn-search-orders').on('click', () => {
  let inputSearchDate = $('#input-search-orders').val();
  let orders = hotel.findAllOrdersByDate(inputSearchDate);
  domUpdates.displaySearchOrders(orders);
  $('#input-search-orders').val('');
});