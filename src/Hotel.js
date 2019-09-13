import domUpdates from './domUpdates.js'
import Guest from './Guest';

class Hotel {
  constructor(guestsData) {
    this.guests = [];
    guestsData.forEach(guestData => this.createNewGuest(guestData.id, guestData.name));
    this.todaysDate = this.findTodaysDate();
  }

  start() {
    this.findTodaysDate();
    console.log(typeof(this.todaysDate));
    domUpdates.displayTodaysDate(this.todaysDate);
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

  findGuestById(guestId) {
    return this.guests.find(guest => guestId === guest.id);
  }

  findTodaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    this.todaysDate = today = yyyy + '/' + dd + '/' + mm;
  }
}

export default Hotel;