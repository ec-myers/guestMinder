import chai from 'chai';
const expect = chai.expect;
// import spies from 'chai-spies';
import Hotel from '../src/Hotel.js'

// chai.use(spies);
// chai.spy.on(domUpdates,
//   ['',
//     '',
//     ''], () => { });

describe('Hotel', () => {
  let guestsData,
      hotel;

  beforeEach( () => {
    guestsData = [{id: 1, name: "Matilde Larson"}];
    hotel = new Hotel(guestsData);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should be able to create a new guest', () => {
    hotel.createNewGuest(guestsData.id, guestsData.name);
    expect(hotel.guests.length).to.eql(2);
  });

  it('should determine the next available guest id', () => {
    expect(hotel.getNextAvailableGuestId()).to.equal(2);
  });

  it('should find a guest by name', () => {
    let guestName = 'Matilde Larson';
    let guest = hotel.findGuestByName(guestName);
    expect(guest.id).to.equal(1);
  });

  it('should find a guest by id', () => {
    let guestId = 1;
    let guest = hotel.findGuestById(guestId);
    expect(guest.name).to.equal('Matilde Larson');
  });
});