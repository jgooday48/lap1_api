//import modules and neccessary functions
const express = require('express')
const cors = require('cors')
const fruits = require('./fruits.json')
const logger = require('./logger')
const fs  = require('fs')

const app = express() //initialise express

// MIDDLEWARE

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => { //opening page
  res.status(200).send('Are you reddy!')
})


app.get('/fruits', (req,res)=> { // allows user to see list of fruits
    res.status(200).send(fruits)
})



app.get('/fruits/:id', (req, res) => { // allows adding of fruits

    const idx = req.params.id - 1
    const fruit = fruits[idx]

    if (!fruit) { // throws error if id does not exist
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

    if (fruit.name===undefined){ // throws error if name is not defined
        res.status(422).send('you need a name to create a fruit')
    }

    fruits.push(fruit) //adds fruit to list
    res.status(201).send({"name": fruit.name, "id": fruit.id})
} )

app.patch('/fruits/:id', async (req,res) => {
  const id = parseInt(req.params.id, 10); // gets id from string and converts to integer

  const existingFruit = fruits.find((fruit) => fruit.id === id); //finds if fruit exists

  if (!existingFruit) { // throws error if index does not exist
    res.status(404).send({ error: `cannot update missing fruit` });
  }

 else if (req.body.name===undefined) {
    res.status(422).send({ error: 'You need to specify the name' })
  }
 else{ //updates fruit as requested via index
  existingFruit.name = req.body.name; 

  res.status(200).send(existingFruit); }
})

app.delete('/fruits/:id', (req,res) => {
  const id = parseInt(req.params.id, 10); // gets id from string and converts to integer
  const deletedFruitIndex = fruits.findIndex((fruit) => fruit.id === id);

  if (deletedFruitIndex === -1) { //throws if user selected fruit not in the file
    return res.status(404).send({ error: `Fruit with id ${id} not found` });
  }

  fruits.splice(deletedFruitIndex, 1); // deletes fruit requested via index

  res.status(204).send('Successfully deleted'); 
})

module.exports = app
