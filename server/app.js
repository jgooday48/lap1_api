const express = require('express')
const cors = require('cors')
const fruits = require('./fruits.json')
const logger = require('./logger')
const fs  = require('fs')

const app = express()


app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
  res.status(200).send('Are you reddy!')
})


app.get('/fruits', (req,res)=> {
    res.status(200).send(fruits)
})



app.get('/fruits/:id', (req, res) => {
    const idx = req.params.id - 1

    const fruit = fruits[idx]

    if (!fruit) {
        res.status(404).send({ error: `Fruit with id ${idx +1} not found` })
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
        res.status(422).send('you need a name to create a fruit')
    }

    fruits.push(fruit)
    res.status(201).send({"name": fruit.name, "id": fruit.id})
} )

app.patch('/fruits/:id', async (req,res) => {
  const id = parseInt(req.params.id, 10); // Parse the ID from the URL params

  const existingFruit = fruits.find((fruit) => fruit.id === id);

  if (!existingFruit) {
    // If the fruit with the specified ID doesn't exist, return a 404 response.
    res.status(404).send({ error: `cannot update missing fruit` });
  }

 else if (req.body.name===undefined) {
    res.status(422).send({ error: 'You need to specify the name' })
  }
 else{
  existingFruit.name = req.body.name; 

  res.status(200).json(existingFruit); }
})

app.delete('/fruits/:id', (req,res) => {
  console.log(req.params)
  const idx = req.params.id - 1

  const fruit = fruits[idx]
  if (!idx) {
    res.status(404).send('doesnt exist')
  }
else {
  fruit.delete
  res.status(204).send('delete route')}


})

module.exports = app
