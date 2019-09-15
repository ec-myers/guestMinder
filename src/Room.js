class Room {
  constructor(roomNumber, roomType, bidet, bedSize, numBeds, costPerNight) {
    this.number = roomNumber;
    this.type = roomType;
    this.bidet = bidet;
    this.bedSize = bedSize;
    this.numBeds = numBeds;
    this.costPerNight = costPerNight;
  }
}

export default Room;