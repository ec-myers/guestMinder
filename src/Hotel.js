import domUpdates from './domUpdates.js'
import Guest from './Guest';
import Room from './Room.js';

class Hotel {
  constructor(guestsData, ordersData, bookingsData, roomsData) {
    this.guests = [];
    this.currentGuest;
    this.todaysDate = this.findTodaysDate();
    this.rooms = [];
    this.menu = [];
    guestsData.forEach(guestData => this.createNewGuest(guestData.id, guestData.name));
    ordersData.forEach(orderData => {
      let guest = this.findGuestById(orderData.userID);
      guest.createOrder(orderData.date, orderData.food, orderData.totalCost);
    });
    bookingsData.forEach(bookingData => {
      let guest = this.findGuestById(bookingData.userID);
      guest.createBooking(bookingData.date, bookingData.roomNumber);
    });
    roomsData.forEach(roomData => this.createRoom(roomData.number,                roomData.roomType, roomData.bidet, roomData.bedSize, roomData.numBeds,      roomData.costPerNight));
  }

  start() {
    this.findTodaysDate();
    this.findTodaysInformation(this.todaysDate);
    this.createMenu();
    this.findAllOrdersByDate();
  }
  
  findTodaysInformation(date) {
    let orders = this.findAllOrdersByDate(date);
    let availableRooms = this.findRoomsBookedByDate(date).length;
    let occupancy = this.calculatePercentageRoomsBookedByDate(date);
    let revenue = this.calculateTotalRevenueByDate(date);
    let mostPopular = this.findMostPopularBookingDate(date);
    let leastPopular = this.findDateWithMostAvailableRooms(date);

    domUpdates.displayTodaysInformation(date, availableRooms, occupancy, revenue);
    domUpdates.displayAllOrders(orders);
    domUpdates.displayBookingsStats(mostPopular, leastPopular);
  }

  createNewGuest(id, name) {
    let guest = new Guest(id, name);
    this.guests.push(guest);
    return guest;
  }

  createRoom(roomNumber, roomType, bidet, bedSize, numBeds, costPerNight) {
    let room = new Room(roomNumber, roomType, bidet, bedSize, numBeds, costPerNight);
    this.rooms.push(room);
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

  findAllOrders() {
    return this.guests.reduce((acc, guest) => {
      guest.orders.forEach(order => {
        acc.push(order);
      });
      return acc;
    }, []);

  }

  findAllOrdersByDate(date) {
    return this.guests.reduce((acc, guest) => {
      guest.orders.forEach(order => {
        if (order.date === date) {
          acc.push(order);
        }
      });
      return acc;
    }, []);
  }

  findAllBookings() {
    return this.guests.reduce((acc, guest) => {
      guest.bookings.forEach(booking => {
        acc.push(booking);
      })
      return acc;
    }, []);
  }

  findAllBookingsByDate(date) {
    return this.guests.reduce((acc, guest) => {
      guest.bookings.forEach(booking => {
        if (booking.date === date) {
          acc.push(booking);
        }
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
    let bookings = this.findAllBookingsByDate(date);

    return this.rooms.filter(room => {
      return !bookings.some(booking => booking.roomNumber === room.number);
    });
  }

  findRoomsBookedByDate(date) {
    let bookings = this.findAllBookingsByDate(date);

    return this.rooms.filter(room => {
      return bookings.some(booking => booking.roomNumber === room.number);
    });
  }

  calculateTotalRevenueByDate(date) {
    let orderRevenue = this.findAllOrdersByDate(date).reduce((acc, order) => {
      return acc += order.totalCost;
    }, 0);

    let bookingsRevenue = this.findAllBookingsByDate(date).reduce((acc, booking) => {
      this.rooms.filter(room => {
        return room.number === booking.roomNumber;
      }).forEach(room => {
        acc += room.costPerNight;
      })
      return acc;
    }, 0);

    return Number((orderRevenue + bookingsRevenue).toFixed(2));
  }

  calculatePercentageRoomsBookedByDate(date) {
    return Number(parseFloat((this.findRoomsBookedByDate(date).length / this.rooms.length) * 100).toFixed(2));
  }

  createMenu() {
    this.menu = this.findAllOrders().reduce((acc, order) => {
      if (!acc.includes({
        food: order.foodItems,
        cost: order.totalCost
      })) {
        acc.push({
          food: order.foodItems,
          cost: order.totalCost
        });
      }
      return acc;
    }, []);
    this.menu.forEach(item => {
      domUpdates.displayMenu(item.food, item.cost)
    });
  }
}

export default Hotel;