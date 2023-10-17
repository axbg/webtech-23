const assert = require('assert')
const compress = require('../app.js')

describe('test compression', function(){
	it('returns empty string', function(){
		assert.strictEqual(compress('', true), '')
	})
	it('returns a4b5c2d4', function(){
		assert.strictEqual(compress('aaaabbbbbccdddd', true), 'a4b5c2d4')
	})
	it('throws an exception', function(){
		assert.throws(() => compress([], true), { message : 'InvalidType' })
	})
	it('returns aaabbbbccc', function(){
		assert.strictEqual(compress('a3b4c3', false), 'aaabbbbccc')
	})
	it('returns abcdd', function(){
		assert.strictEqual(compress('abcdd'), 'a1b1c1d2')
	})
})
