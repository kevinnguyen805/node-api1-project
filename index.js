// implement your API here

const express = require('express')      // import express module

const db = require('./data/db.js')      // import database 

const server = express();               // creates a server

server.use(express.json());             // add middleware to allow express to read JSON (for POST and PUT)


server.get('/', (req, res)=> {
     res.send('Hello')
})  // handles GET requests to / on localhost:8000


// * GET SUCCESS
server.get('/api/users', (req, res) => {
     db.find()
     .then(users => {
          res.status(200).json(users)
     })
     .catch(err => {
          res.status(500).json({ error: 'failed to get user from db' })
     })
})

// * GET ID SUCCESS
server.get('/api/users/:id', (req, res) => {
     const id = req.params.id
     db.findById(id)
     .then(users => {
          res.status(200).json({message: `user with id ${id} has been found`})
     })
     .catch(err => {
          res.status(500).json({ error: 'failed to get user from db' })
     })
})

// * POST SUCCESS
server.post('/api/users', (req, res)=> {
     const userInfo = req.body

     db.insert(userInfo)
     .then(user => {
          res.status(201).json(user)
     })
     .catch(err => {
          res.status(500).json({ error: 'failed to POST user to db' })
     })
})

// * DELETE SUCCESS
server.delete('/api/users/:id', (req, res) => {
     const id = req.params.id

     db.remove(id)
     .then(user => {
          res.status(200).json({message: `user ${id} has been deleted`})
     })
     .catch(err => {
          res.status(500).json({error: 'failed to DELETE user from db'})
     })
})


// * PUT SUCCESS
server.put('/api/users/:id', (req, res)=> {
     const id = req.params.id
     const updateUser = req.body

     db.update(id, updateUser)
     .then(user => {
          res.status(200).json({message: `user ${id} has been updated with ${updateUser}`})
     })
     .catch(error => {
          res.status(500).json({error: 'failed to update user'})
     })
})


const port = 8000;       // listens for requests on a particular local host (port)
server.listen(port, () => console.log('Im listening on port 8000'))