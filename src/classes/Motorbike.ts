// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// The Motorbike class extends the Vehicle class
class Motorbike extends Vehicle {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];

  // Constructor for the Motorbike class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[] = []
  ) {
    // Call the parent class constructor
    super();

    // Initialize properties
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;

    // Ensure exactly 2 wheels are present; otherwise, create defaults
    if (wheels.length !== 2) {
      console.log("Invalid wheel count for Motorbike. Defaulting to 2 new wheels.");
      this.wheels = [new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }
  }

  // Method to perform a wheelie
  doWheelie(): void {
    if (this.started) {
      console.log(`🏍️ Motorbike ${this.make} ${this.model} is doing a wheelie!`);
    } else {
      console.log("❌ Start the motorbike first before performing a wheelie.");
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    console.log(`\n--- Motorbike Details ---`);
    super.printDetails(); // Call the parent class's printDetails method
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Color: ${this.color}`);
    console.log(
      `Front Wheel: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`
    );
    console.log(
      `Rear Wheel: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`
    );
    console.log(`-------------------------\n`);
  }
}

// Export the Motorbike class as the default export
export default Motorbike;
