import chai from 'chai';
const expect = chai.expect;
// import spies from 'chai-spies';
import Guest from '../src/Guest.js'

// chai.use(spies);
// chai.spy.on(domUpdates,
//   ['',
//     '',
//     ''], () => { });

describe('Guest', () => {
  let guest,
      order;

  beforeEach( () => {
    guest = new Guest(99, 'Elyse');
    order = {
      userID: 1,
      date: '2019/07/29',
      food: 'Rustic Concrete Sandwich',
      totalCost: 14.9
    }
  });

  it('should be a function', () => {
    expect(Guest).to.be.a('function');
  });

  it('should be an instance of Guest', () => {
    expect(guest).to.be.an.instanceOf(Guest);
  });

  it('should have an id', () => {
    expect(guest.id).to.equal(99);
  });

  it('should have a name', () => {
    expect(guest.name).to.equal('Elyse');
  });

  it('should have zero orders to start', () => {
    expect(guest.orders.length).to.equal(0);
  });

  it('should have correct orders for each guest', () => {
    guest.createOrder('2019/07/29', 'Rustic Concrete Sandwich', 14.9);
    expect(guest.orders.length).to.equal(1);
  });

  it('should calculate order totals by date', () => {
    guest.orders.push(order);
    expect(guest.createOrderBreakdownByDate()).to.equal();
  });

  it('should find the total of a guest\'s orders by date', () => {
    guest.orders.push(order);
    expect(guest.findGuestTotalForOrdersByDate('2019/07/29')).to.equal(14.9);
  });

  it('should find the total for all of a guest\'s orders', () => {
    guest.orders.push(order);
    expect(guest.findGuestTotalForAllOrders()).to.equal(14.9);
  });
});