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
      bookingsData,
      roomsData,
      hotel;

  beforeEach( () => {
    guestsData = [{id: 1, name: 'Matilde Larson'}];
    ordersData = [{
      userID: 1,
      date: '2019/07/29',
      food: 'Rustic Concrete Sandwich',
      totalCost: 14.9
    }];
    bookingsData = [{
      userID: 1,
      date: '2019/07/29',
      roomNumber: 1
    },
    {
      userID: 1,
      date: '2019/07/30',
      roomNumber: 5
    },
    {
      userID: 1,
      date: '2019/07/29',
      roomNumber: 5
    }];
    roomsData = [{
      number: 1,
      roomType: 'residential suite',
      bidet: false,
      bedSize: 'twin',
      numBeds: 1,
      costPerNight: 265.03
    },
    {
      number: 2,
      roomType: 'junior suite',
      bidet: true,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 216.05
    }];
    hotel = new Hotel(guestsData, ordersData, bookingsData, roomsData);
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
    expect(hotel.findNextAvailableGuestId()).to.equal(2);
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

  it('should find all bookings', () => {
    expect(hotel.findAllBookings().length).to.equal(3);
  });

  it('should find all bookings by date', () => {
    expect(hotel.findAllBookingsByDate('2019/07/29').length).to.equal(2);
  });

  it('should find the most popular booking date', () => {
    expect(hotel.findMostPopularBookingDate()).to.equal('2019/07/29');
  });

  it('should find the date with the most available rooms', () => {
    expect(hotel.findDateWithMostAvailableRooms()).to.equal('2019/07/30');
  });

  it('should find rooms available by date', () => {
    expect(hotel.findRoomsAvailableByDate('2019/07/29')).to.eql([{
      number: 2,
      type: 'junior suite',
      bidet: true,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 216.05
    }]);
  });

  it('should calculate total revenue on a given day', () => {
    expect(hotel.calculateTotalRevenueByDate('2019/07/29')).to.equal(279.93);
  });
});