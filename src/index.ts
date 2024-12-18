import Truck from "./classes/Truck.js";
import Motorbike from "./classes/Motorbike.js";
import Car from "./classes/Car.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

const vehicles = [];

// Create a Car instance
const car1 = new Car(Cli.generateVin(), 'blue', 'Toyota', 'Camry', 2021, 3000, 130, []);
vehicles.push(car1);

// Create a Truck instance
const truck1 = new Truck(Cli.generateVin(), 'red', 'Ford', 'F-150', 2021, 5000, 120, [], 10000);
vehicles.push(truck1);

// Create a Motorbike instance
const motorbike1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
const motorbike1 = new Motorbike(Cli.generateVin(), 'black', 'Harley Davidson', 'Sportster', 2021, 500, 125, motorbike1Wheels);
vehicles.push(motorbike1);

// Create a new instance of the Cli class
const cli = new Cli(vehicles);

// Start the CLI
cli.startCli();
