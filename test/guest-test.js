import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
import Customer from '../src/Customer.js'

chai.use(spies);
// chai.spy.on(domUpdates,
//   ['',
//     '',
//     ''], () => { });

describe('Customer', () => {
  let customer;

  beforeEach( () => {
    customer = new Customer();
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });
});