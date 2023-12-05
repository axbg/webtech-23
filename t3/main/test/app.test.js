import request from 'supertest'
import app from '../app.js'

beforeAll((done) => {
    request(app).get('/create').send()
        .then(() => {
            done()
        })
})

describe('Test post /food-items', () => {
  
    test('If request body is not sent server should respond with status code 400 and {"message": "body is missing"}', (done) => {
        request(app).post('/food-items')
            .send()
            .expect(400)
            .then(res => {
                expect(JSON.parse(res.text).message).toBe('body is missing')
                done()
            })
    })

    test('If request body is present but did not follow the specified format, server should respond with status code 400 and {"message": "malformed request"}', (done) => {
        request(app).post('/food-items')
            .send({name : 'x', calories : 22})
            .expect(400)
            .then(res => {
                expect(JSON.parse(res.text).message).toBe('malformed request')
                done()
            })
    })


    test('Calories should not be negative', (done) => {
        request(app).post('/food-items').send({
            name: "milk",
            category: "DAIRY",
            calories: -4
        }).expect(400).then(res => {
            expect(JSON.parse(res.text).message).toBe('calories should be a positive number')
            done()
        })
    })

    test('A food item can be added', (done) => {
        request(app).post('/food-items').send({
            name: "milk",
            category: "DAIRY",
            calories: 42
        }).expect(201).then(res => {
            expect(JSON.parse(res.text).message).toBe('created')
            done()
        })
    })

    test('If request body is present but the food item does not have a type of an allowed length, server should respond with status code 400 and {"message": "not a valid type"}', (done) => {
        request(app).post('/food-items').send({
            name: "milk",
            category: "S",
            calories: 100
        }).expect(400).then(res => {
            expect(JSON.parse(res.text).message).toBe('not a valid category')
            done()
        })
    })

})



