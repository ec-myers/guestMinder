import $ from 'jquery';
import './css/base.scss';
import './images/desk-bell.svg';
import './images/background-img.jpg';

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