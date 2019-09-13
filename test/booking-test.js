import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
import Booking from '../src/Booking.js'

chai.use(spies);
// chai.spy.on(domUpdates,
//   ['',
//     '',
//     ''], () => { });

describe('Booking', () => {
  let booking;

  beforeEach(() => {
    booking = new Booking();
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });
});