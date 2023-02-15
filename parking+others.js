class ParkingLot {
  constructor(capacity) {
    this.capacity = capacity;
    this.cars = {};
    this.prices = {
      perHour: 200,
      perHourSerbian: 150,
    };
  }

  isSerbianPlate(plate) {
    // Serbian license plates start with two letters (in Serbian Cyrillic)
    // followed by three or four digits and end with two letters (in Serbian Cyrillic)
    const regex = /^[А-Ш][А-Ш][\d]{3,4}[А-Ш][А-Ш]$/;
    return regex.test(plate);
  }

  park(car) {
    if (Object.keys(this.cars).length === this.capacity) {
      return "Parking je pun";
    }
    this.cars[car] = new Date();
    return `${car} is parked successfully`;
  }

  leave(car) {
    if (!this.cars[car]) {
      return `${car} is not found`;
    }
    const parkedTime = (new Date() - this.cars[car]) / 1000 / 60 / 60;
    let fee = 0;
    if (parkedTime > 1 || !this.isSerbianPlate(car)) {
      fee = Math.ceil(parkedTime - 1) * this.prices.perHour;
    }
    if (this.isSerbianPlate(car)) {
      fee = Math.ceil(parkedTime) * this.prices.perHourSerbian;
    }
    delete this.cars[car];
    return `${car} has left the parking lot, fee: ${fee}`;
  }
}

const parkingLot = new ParkingLot(5);
console.log(parkingLot.park("BG12345AB")); // "BG12345AB is parked successfully"
console.log(parkingLot.park("XX12345YY")); // "XX12345YY is parked successfully"
setTimeout(() => {
  console.log(parkingLot.leave("BG12345AB")); // "BG12345AB has left the parking lot, fee: 50"
}, 1000 * 60 * 60);
setTimeout(() => {
  console.log(parkingLot.leave("XX12345YY")); // "XX12345YY has left the parking lot, fee: 100"
}, 2 * 1000 * 60 * 60);
