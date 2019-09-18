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
    booking = new Booking('2019/07/29', 1);
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });

  it('should have a date', () => {
    expect(booking.date).to.equal('2019/07/29');
  });

  it('should have a room number', () => {
    expect(booking.roomNumber).to.equal(1);
  });
});