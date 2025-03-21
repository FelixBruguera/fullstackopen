require('dotenv').config()
const express = require("express")
const Person = require("./models/person")
const app = express()
var morgan = require('morgan')
app.use(express.json())
app.use(express.static('dist'))

morgan.token("body", (req) => JSON.stringify(req.body))
app.use(morgan("tiny"))
app.use(morgan(':body'))

const PORT = process.env.PORT
app.listen(PORT)


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    Person.find({}).then(data => response.send(data))
})

app.get("/info", (request, response) => {
    Person.find({})
    .then(data => response.send(`Phonebook has info of ${data.length} people` + "<br> <br>" + new Date()))
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    Person.findById(id)
    .then(person => response.send(person))
    .catch(person => response.status(404).end())
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter((per) => per.id != id)
    response.status(204).end()
})

// const checkDuplicates = (name) => persons.find((per) => per.name === name)

app.post("/api/persons", (request, response) => {
    if (request.body.name && request.body.number) {
        const newPerson = new Person({"name": request.body.name, "number": request.body.number})
        newPerson.save().then(data => response.status(200).send(data))
    }
    else {
        response.status(400).json({error: "Your request must include a name and a number field"}).end()
    }
})