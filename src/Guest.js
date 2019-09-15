import Order from "./Order";

class Guest {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.orders = [];
  }

  createOrder(date, food, totalCost) {
    let order = new Order(date, food, totalCost);

    this.orders.push(order);
  }

  findGuestTotalForOrdersByDate(date) {
    return this.orders.reduce((acc, order) => {
      if (order.date === date) {
        acc += order.totalCost;
      }
      return acc;
    }, 0)
  }

  findGuestTotalForAllOrders() {
    return this.orders.reduce((acc, order) => {
      return acc += order.totalCost;
    }, 0)
  }
}

export default Guest;