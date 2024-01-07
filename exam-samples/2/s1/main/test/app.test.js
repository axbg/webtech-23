let assert = require('assert')

describe('distance', function(){
	let Vehicle = require('../app').Vehicle
	let Car = require('../app').Car
	it('creates a Car and it inherits Vehicle', function(){
		let p1 = new Car('Luigi')
		assert.strictEqual(p1 instanceof Car && p1 instanceof Vehicle, true)
	})
	it('creates a Car and it makes a stop', function(){
		let p1 = new Car('Luigi')
		assert.strictEqual(p1.makeStop(), 'Luigi makes a stop')
	})
	it('throws an exception', function(){
		assert.throws(() => new Car(), {message : 'CreationError'})
	})
	it('creates a Car and it fuelss', function(){
		let p1 = new Car('Luigi')
		assert.strictEqual(p1.fuels(100), 'Luigi fuels 100')
	})
	it('creates a Car and it does not drive', function(){
		let p1 = new Car('Luigi')
		assert.strictEqual(p1.drive(100), 'Luigi is a Car and cannot drive')
	})
})