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



}

export default Hotel;