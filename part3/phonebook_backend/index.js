require('dotenv').config()
const express = require("express")
const Person = require("./models/person")
const app = express()
var morgan = require('morgan')
app.use(express.static('dist'))
app.use(express.json())

morgan.token("body", (req) => JSON.stringify(req.body))
app.use(morgan("tiny"))
app.use(morgan(':body'))

const PORT = process.env.PORT
app.listen(PORT)

app.get("/api/persons", (request, response) => {
    Person.find({})
    .then(data => response.send(data))
    .catch(error => next(error))
})

app.get("/info", (request, response) => {
    Person.find({})
    .then(data => response.send(`Phonebook has info of ${data.length} people` + "<br> <br>" + new Date()))
    .catch(error => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
    .then(person => person ? response.send(person) : response.status(404).end())
    .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndUpdate(id, {name: request.body.name, number: request.body.number}, {new: true, runValidators: true})
  .then(person => response.send(person))
  .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
    .then(data => response.status(204).end())
})

app.post("/api/persons", (request, response, next) => {
    const newPerson = new Person({"name": request.body.name, "number": request.body.number})
    newPerson.save()
    .then(data => response.status(200).send(data))
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.name)

  if (error.name === "CastError") {
    return response.status(400).send("Malformed ID")
  }
  if (error.name === "ValidationError") {
    return response.status(400).send(error.message)
  }

  next(error)

}

app.use(errorHandler)