import chai from 'chai';
const expect = chai.expect;
// import spies from 'chai-spies';
import Room from '../src/Room';

// chai.use(spies);
// chai.spy.on(domUpdates,
//   ['',
//     '',
//     ''], () => { });

describe('Room', () => {
  let room;

  beforeEach(() => {
    room = new Room(1, 'residential suite', false, 'twin', 1, 265.03);
  });

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Room', () => {
    expect(room).to.be.an.instanceOf(Room);
  });

  it('should have a room number', () => {
    expect(room.number).to.equal(1);
  });

  it('should have a room type', () => {
    expect(room.type).to.equal('residential suite');
  });

  it('should know if there is a bidet', () => {
    expect(room.bidet).to.equal(false);
  });

  it('should have a bed size', () => {
    expect(room.bedSize).to.equal('twin');
  });

  it('should have a number of beds', () => {
    expect(room.numBeds).to.equal(1);
  });

  it('should have a cost per night', () => {
    expect(room.costPerNight).to.equal(265.03);
  });
});
