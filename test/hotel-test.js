import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
import Hotel from '../src/Hotel.js'

chai.use(spies);
// chai.spy.on(domUpdates,
//   ['',
//     '',
//     ''], () => { });

describe('Hotel', () => {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel();
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });
});