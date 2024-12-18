// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") this.createCar();
        else if (answers.vehicleType === "Truck") this.createTruck();
        else if (answers.vehicleType === "Motorbike") this.createMotorbike();
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "towingCapacity", message: "Enter Towing Capacity" },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  // Method to perform actions on a vehicle
performActions(): void {
  const selectedVehicle = this.vehicles.find(
    (vehicle) => vehicle.vin === this.selectedVehicleVin
  );

  if (!selectedVehicle) {
    console.log("❌ No vehicle selected. Please try again.");
    this.startCli();
    return;
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Select an action",
        choices: [
          "Print details",
          "Start vehicle",
          "Accelerate 5 MPH",
          "Decelerate 5 MPH",
          "Stop vehicle",
          "Turn right",
          "Turn left",
          "Reverse",
          "Tow another vehicle",
          "Do a wheelie",
          "Select or create another vehicle",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Print details":
          selectedVehicle.printDetails();
          break;
        case "Start vehicle":
          selectedVehicle.start();
          break;
        case "Accelerate 5 MPH":
          selectedVehicle.accelerate(5);
          break;
        case "Decelerate 5 MPH":
          selectedVehicle.decelerate(5);
          break;
        case "Stop vehicle":
          selectedVehicle.stop();
          break;
        case "Turn right":
          selectedVehicle.turn("right");
          break;
        case "Turn left":
          selectedVehicle.turn("left");
          break;
        case "Reverse":
          selectedVehicle.reverse();
          break;
        case "Tow another vehicle":
          if (selectedVehicle instanceof Truck) {
            this.findVehicleToTow(selectedVehicle);
          } else {
            console.log("❌ Only trucks can tow vehicles.");
          }
          break;
        case "Do a wheelie":
          if (selectedVehicle instanceof Motorbike) {
            selectedVehicle.doWheelie();
          } else {
            console.log("❌ Only motorbikes can do a wheelie.");
          }
          break;
        case "Select or create another vehicle":
          this.startCli();
          return;
        case "Exit":
          this.exit = true;
          console.log("🚪 Exiting the application.");
          return;
      }

      // Repeat actions unless exit is chosen
      if (!this.exit) this.performActions();
    });
}


  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle,
          })),
        },
      ])
      .then((answers) => {
        if (answers.vehicleToTow.vin === truck.vin) {
          console.log("A truck cannot tow itself.");
        } else {
          truck.tow(answers.vehicleToTow);
        }
        this.performActions();
      });
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message: "Would you like to create a new vehicle or select an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }
}

export default Cli;
