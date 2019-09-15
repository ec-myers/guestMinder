import domUpdates from './domUpdates.js'
import Guest from './Guest';

class Hotel {
  constructor(guestsData, ordersData) {
    this.guests = [];
    this.currentGuest;
    this.todaysDate = this.findTodaysDate();
    guestsData.forEach(guestData => this.createNewGuest(guestData.id, guestData.name));
    ordersData.forEach(orderData => {
      let guest = this.findGuestById(orderData.userID);
      guest.createOrder(orderData.date, orderData.food, orderData.totalCost);
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
}

export default Hotel;