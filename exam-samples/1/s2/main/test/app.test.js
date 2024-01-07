const app = require('./../app');

describe('Test addTokens function', () => {
    test('input should be a string', (done) => {
        expect(() => {
            app.addTokens(5)
        }).toThrowError('Invalid input');
        done();
    });
    test('input should be at least 6 characters long', (done) => {
        expect(() => {
            app.addTokens('Input')
        }).toThrowError('Input should have at least 6 characters');
        done();
    })
    test('tokens parameter should contain elements with the following format {tokenName: string}', (done) => {
        expect(() => {
            app.addTokens('Inputs', [{tokenName: 5}])
        }).toThrowError('Invalid array format');
        done();
    })
    test('if there is nothing to replace in the input then return it as it is', (done) => {
        expect(app.addTokens('Inputs', [{tokenName: "user"}])).toBe('Inputs');
        done();
    });
    test('if the input contains at least ... replace it accordingly', (done) => {
        expect(app.addTokens('Subsemnatul ...', [{tokenName: 'subsemnatul'}])).toBe('Subsemnatul ${subsemnatul}');
        done();
    })
});