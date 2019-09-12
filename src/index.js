import $ from 'jquery';
import './css/base.scss';
import './images/desk-bell.svg';
import './images/background-img.jpg';
import Hotel from './Hotel';

let hotel;

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(data => data.json()), 
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json()), 
  fetch ('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(data => data.json()), 
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices')
  .then(data => data.json())])
  .then(data => hotel = new Hotel(data[0].users, data[1].rooms, data[2].bookings, data[3].roomServices));

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

$('#btn-add-guest').on('click', () => {
  let newGuestName = $('#input-add-guest').val();
  hotel.createNewGuest(hotel.getNextAvailableGuestId(), newGuestName);
});

$('#btn-search-guest').on('click', () => {
  let searchGuestName = $('#input-search-guest').val();
  hotel.findGuestByName(searchGuestName);
});