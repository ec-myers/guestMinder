import Guest from "./Guest";

class Hotel {
  constructor(guestsData) {
    this.guests = [];
    guestsData.forEach(guestData => this.createNewGuest(guestData.id, guestData.name));
  }

  createNewGuest(id, name) {
    let guest = new Guest(id, name);
    this.guests.push(guest);
  }

  getNextAvailableGuestId() {
    return this.guests.length + 1;
  }

  findGuestByName(guestName) {
    return this.guests.find(guest => guestName.toLowerCase() === guest.name.toLowerCase());
  }


}

export default Hotel;