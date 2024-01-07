let assert = require('assert')

describe('distance', function(){
	let distance = require('../app').distance
	it('returns 1', function(){
		assert.strictEqual(distance('book','books'), 1)
	})
	it('returns 4', function(){
		assert.strictEqual(distance('cats', 'placate'), 4)
	})
	it('throws an exception', function(){
		assert.throws(() => distance([], 'c'), {message : 'InvalidType'})
	})
	it('returns 0', function(){
		assert.strictEqual(distance('', ''), 0)
	})
	it('returns 2', function(){
		assert.strictEqual(distance('bring', 'fringe'), 2)
	})
})