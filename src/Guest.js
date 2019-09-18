import Order from './Order';
import Booking from './Booking';

class Guest {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.orders = [];
    this.bookings = [];
  }

  createOrder(date, food, totalCost) {
    let order = new Order(date, food, totalCost);

    this.orders.push(order);
  }

  createOrderBreakdownByDate() {
    this.orders.reduce((acc, order) => {
      if (!acc[order.date]) {
        acc[order.date] = 0;
      }
      acc[order.date] += order.totalCost;
      return acc;
    }, {});
  }

  findGuestTotalForOrdersByDate(date) {
    return this.orders.reduce((acc, order) => {
      if (order.date === date) {
        acc += order.totalCost;
      }
      return acc;
    }, 0);
  }

  findGuestTotalForAllOrders() {
    return this.orders.reduce((acc, order) => {
      return (acc += order.totalCost);
    }, 0);
  }

  createBooking(date, roomNumber) {
    let booking = new Booking(date, roomNumber);

    this.bookings.push(booking);
  }

  createRoomServiceOrder(date, food, cost) {
    this.orders.push({
      date,
      foodItems: food,
      totalCost: cost
    });
  }

  calculateTotalBill(date, roomsArray) {
    let ordersTotal = this.findGuestTotalForOrdersByDate(date);
    let bookingsTotal = this.findGuestBookingsTotalByDate(date, roomsArray);

    return bookingsTotal + ordersTotal;
  }

  findGuestBookingsTotalByDate(date, roomsArray) {
    return this.bookings.reduce((acc, booking) => {
      if (booking.date === date) {
        roomsArray.forEach(room => {
          if (booking.roomNumber === room.number) {
            acc += room.costPerNight;  
          }
          return acc;
        })
      }
      return acc;
    }, 0);
  }
}

export default Guest;