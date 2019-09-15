import domUpdates from './domUpdates.js'
import Guest from './Guest';

class Hotel {
  constructor(guestsData, ordersData, bookingsData) {
    this.guests = [];
    this.currentGuest;
    this.todaysDate = this.findTodaysDate();
    guestsData.forEach(guestData => this.createNewGuest(guestData.id, guestData.name));
    ordersData.forEach(orderData => {
      let guest = this.findGuestById(orderData.userID);
      guest.createOrder(orderData.date, orderData.food, orderData.totalCost);
    });
    bookingsData.forEach(bookingData => {
      let guest = this.findGuestById(bookingData.userID);
      guest.createBooking(bookingData.date, bookingData.roomNumber);
    });

  }

  start() {
    this.findTodaysInformation();
  }
  
  findTodaysInformation() {
    this.findTodaysDate();
    let orders = this.findAllOrdersByDate(this.todaysDate);
    console.log(orders)
    domUpdates.displayTodaysInformation(this.todaysDate, orders);

  }

  createNewGuest(id, name) {
    let guest = new Guest(id, name);
    this.guests.push(guest);
    return guest;
  }

  findNextAvailableGuestId() {
    return this.guests.length + 1;
  }

  findGuestByName(guestName) {
    return this.guests.find(guest => guestName.toLowerCase() === guest.name.toLowerCase());
  }

  findGuestById(guestId) {
    return this.guests.find(guest => guestId === guest.id);
  }

  findTodaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    this.todaysDate = today = yyyy + '/' + mm + '/' + dd;
  }

  findAllOrdersByDate(date) {
    return this.guests.reduce((acc, guest) => {
      guest.orders.forEach(order => {
        if (order.date === date) {
          acc.push(order);
        }
      })
      return acc;
    }, [])
  }

  findAllBookings() {
    return this.guests.reduce((acc, guest) => {
      guest.bookings.forEach(booking => {
        acc.push(booking);
      })
      return acc;
    }, []);
  }

  findMostPopularBookingDate() {
    let bookings = this.findAllBookings(); 
    let dayTotals = bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = []
      }
      acc[booking.date].push(booking);
      return acc;
    }, {});

    return Object.keys(dayTotals).sort((a, b) => {
      return dayTotals[b].length - dayTotals[a].length;
    }).slice(0, 1)[0];
  }
  

  findDateWithMostAvailableRooms() {
    let bookings = this.findAllBookings(); 
    let dayTotals = bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = []
      }
      acc[booking.date].push(booking);
      return acc;
    }, {});
    return Object.keys(dayTotals).sort((a, b) => {
      return dayTotals[a].length - dayTotals[b].length;
    }).slice(0, 1)[0];
  }

  findRoomsAvailableByDate(date) {

  }
}

export default Hotel;