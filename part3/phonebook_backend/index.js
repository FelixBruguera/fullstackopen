const express = require("express")
const app = express()
var morgan = require('morgan')
app.use(express.json())
morgan.token("body", (req) => JSON.stringify(req.body))

app.use(morgan("tiny"))
app.use(morgan(':body'))

const PORT = process.env.PORT || 3001
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
    response.send(persons)
})

app.get("/info", (request, response) => {
    const text = `Phonebook has info of ${persons.length} people`
    response.send(text + "<br> <br>" + new Date())
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find((per) => per.id === id)
    person ? response.send(person) : response.status(404).end()
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter((per) => per.id != id)
    response.status(204).end()
})

const checkDuplicates = (name) => persons.find((per) => per.name === name)

app.post("/api/persons", (request, response) => {
    if (request.body.name && request.body.number) {
        if (checkDuplicates(request.body.name)) {
            return response.status(400).json({error: "A person with that name already exists"}).end()
        }
        const id = Math.floor(Math.random() * 1000)
        const newPerson = {"id": String(id), "name": request.body.name, "number": request.body.number}
        persons = persons.concat(newPerson)
        response.status(200).send(newPerson)
    }
    else {
        response.status(400).json({error: "Your request must include a name and a number field"}).end()
    }
})