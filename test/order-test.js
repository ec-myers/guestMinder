import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
import Order from '../src/Order.js'

// chai.use(spies);
// chai.spy.on(domUpdates,
//   ['',
//     '',
//     ''], () => { });

describe('Order', () => {
  let order;

  beforeEach(() => {
    order = new Order('2019/07/29', 'Rustic Concrete Sandwich', 14.9
);
  });

  it('should be a function', () => {
    expect(Order).to.be.a('function');
  });

  it('should be an instance of Order', () => {
    expect(order).to.be.an.instanceOf(Order);
  });

  it('should have a date', () => {
    expect(order.date).to.equal('2019/07/29');
  });

  it('should contain food items', () => {
    expect(order.foodItems).to.equal('Rustic Concrete Sandwich');
  });

  it('should have a total cost', () => {
    expect(order.totalCost).to.equal(14.9);
  });


});