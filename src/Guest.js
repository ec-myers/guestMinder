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
}

export default Guest;