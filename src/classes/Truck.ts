// Import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// The Truck class extends the Vehicle class and implements the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;

  // Constructor for the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[] = [],
    towingCapacity: number
  ) {
    // Call the parent class constructor
    super();

    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;

    // Ensure there are exactly 4 wheels (if not, create 4 default wheels)
    if (wheels.length !== 4) {
      console.log("Invalid wheel count for Truck. Defaulting to 4 new wheels.");
      this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }
  }

  // Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    if (vehicle === this) {
      console.log("A truck cannot tow itself!");
      return;
    }

    const { make, model, weight: vehicleWeight } = vehicle;

    if (vehicleWeight <= this.towingCapacity) {
      console.log(`🚚 The ${this.make} ${this.model} is towing the ${make} ${model}.`);
    } else {
      console.log(`❌ The ${make} ${model} is too heavy (${vehicleWeight} lbs) to be towed by this truck (Max: ${this.towingCapacity} lbs).`);
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    console.log(`\n--- Truck Details ---`);
    super.printDetails(); // Call parent method for common details
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Color: ${this.color}`);
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);

    // Print wheel details dynamically
    this.wheels.forEach((wheel, index) => {
      console.log(
        `Wheel ${index + 1}: ${wheel.getDiameter} inch with a ${wheel.getTireBrand} tire`
      );
    });
    console.log(`-----------------------\n`);
  }
}

// Export the Truck class as the default export
export default Truck;
