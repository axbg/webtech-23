const express = require('express')

const app = express()

// app.use('/', express.static('public'))

app.get('/cars', (req, res) => {
    res.status(200).json([
        {
        name :  'Luigi',
        color : 'green'
    },
    {
        name :  'McQueen',
        color : 'red'
    },
    {
        name :  'Bucșă',
        color : 'red'
    }])
})

module.exports = app