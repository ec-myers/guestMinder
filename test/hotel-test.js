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
      ordersData,
      hotel;

  beforeEach( () => {
    guestsData = [{id: 1, name: "Matilde Larson"}];
    ordersData = [{
      userID: 1,
      date: '2019/07/29',
      food: 'Rustic Concrete Sandwich',
      totalCost: 14.9
    }]
    hotel = new Hotel(guestsData, ordersData);
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

  it('should assign orders to the correct guest', () => {
    let guestId = 1;
    let guest = hotel.findGuestById(guestId);
    expect(guest.orders.length).to.equal(1);
  });

  it('should find all orders for a given day', () => {
    expect(hotel.findAllOrdersByDate('2019/07/29').length).to.eql(1)
  });
});