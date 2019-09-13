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
  let guest;

  beforeEach( () => {
    guest = new Guest(99, 'Elyse');
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
  })
});