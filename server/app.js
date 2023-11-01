const express = require('express')
const cors = require('cors')
const fruits = require('./fruits.json')
const logger = require('./logger')

const app = express()

// MIDDLEWARE

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
  res.status(200).send('Hello Reddy!')
})


app.get('/fruits', (req,res)=> {
    res.status(200).send(fruits)
})



app.get('/fruits/:id', (req, res) => {
    const idx = req.params.id - 1

    const fruit = fruits[idx]

    if (!fruit) {
        res.status(404).send({ error: "fruit not found" })
    }
    else {
        res.status(200).send(fruit)
    }
})

app.post('/fruits', (req,res) => {
    console.log("server line38")
    const fruit = req.body
    const lastFruit = fruits[fruits.length -1]
    const lastId = lastFruit ? lastFruit.id +1 : 1
    fruit.id = lastId

    if (fruit.name===undefined){
        res.status()
    }

    fruits.push(fruit)
    res.status(201).send('it works')
} )

app.patch('/fruits/:id', (req,res) => {
    
})

app.delete('/fruits/:id', (req,res) => {
    
})

module.exports = app
