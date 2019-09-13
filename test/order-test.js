import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
import Order from '../src/Order.js'

chai.use(spies);
// chai.spy.on(domUpdates,
//   ['',
//     '',
//     ''], () => { });

describe('Order', () => {
  let order;

  beforeEach(() => {
    order = new Order();
  });

  it('should be a function', () => {
    expect(Order).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(order).to.be.an.instanceOf(Order);
  });
});