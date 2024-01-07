class Vehicle {
	constructor(name){
		this.name = name
	}

	drive(distance){
		return `${this.name} drives ${distance}` 
	}

	// TODO: implement method
}

// TODO: implement Car

class Car {
}


module.exports.Vehicle = Vehicle
module.exports.Car = Car