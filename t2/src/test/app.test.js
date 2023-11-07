const assert = require('assert')
const { render } = require('../app.js')

describe('test rendering', function(){
	it('returns empty string', function(){
		assert.strictEqual(render({}, {}), '')
	})
    it('throws an exception for invalid parameter type', function(){
        assert.throws(() => render('', {}), { message : 'InvalidType' })
    })
	it('returns rendered value', function(){
		assert.strictEqual(render({
            a: 'stuff'
        }, {}), '<a>stuff</a>')
	})
	it('replaces tokens', function(){
		assert.strictEqual(render({ a: 'some ${value}'}, { value: 'thing'}), '<a>some thing</a>')
	})
	it('handles complex structure', function(){
		assert.strictEqual(render({
            a: {
                b: {
                    c: 'content'
                },
                d: '${v1}'
            },
            c: {
                e: '${v2}'
            }
        }, {
            v1: 'first',
            v2: 'second'
        }), '<a><b><c>content</c></b><d>first</d></a><c><e>second</e></c>')
	})
})
