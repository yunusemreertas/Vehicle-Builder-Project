import Driveable from '../interfaces/Driveable.js';

class Vehicle implements Driveable {
  started: boolean;
  currentSpeed: number;

  constructor() {
    this.started = false;
    this.currentSpeed = 0;
  }

  printDetails(): void {
    console.log(`\n--- Vehicle Details ---`);
    console.log(`Started: ${this.started ? "Yes" : "No"}`);
    console.log(`Current Speed: ${this.currentSpeed} mph`);
    console.log(`-----------------------\n`);
  }

  start(): void {
    if (!this.started) {
      this.started = true;
      console.log("Vehicle has started.");
    } else {
      console.log("The vehicle is already started.");
    }
  }

  accelerate(change: number): void {
    if (this.started) {
      this.currentSpeed += change;
      console.log(`The vehicle accelerated. Current speed: ${this.currentSpeed} mph`);
    } else {
      console.log("Start the vehicle first to accelerate.");
    }
  }

  decelerate(change: number): void {
    if (this.started) {
      this.currentSpeed -= change;
      if (this.currentSpeed < 0) this.currentSpeed = 0; // Prevent negative speed
      console.log(`The vehicle decelerated. Current speed: ${this.currentSpeed} mph`);
    } else {
      console.log("Start the vehicle first to decelerate.");
    }
  }

  stop(): void {
    if (this.started) {
      this.currentSpeed = 0;
      this.started = false;
      console.log("Vehicle has stopped.");
    } else {
      console.log("The vehicle is already stopped.");
    }
  }

  turn(direction: string): void {
    if (this.started) {
      console.log(`The vehicle turned ${direction}.`);
    } else {
      console.log("Start the vehicle first to turn.");
    }
  }

  reverse(): void {
    if (this.started) {
      console.log("The vehicle is reversing.");
    } else {
      console.log("Start the vehicle first to reverse.");
    }
  }
}

export default Vehicle;
