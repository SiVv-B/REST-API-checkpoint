const { response, json } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const USer = require('./models/User')
const app = express()
app.use(express.json())
require('dotenv').config({ path: './config/.env' })
mongoose.connect(process.env.URL, (error) => {
  if (error) {
    console.log(error)
  }
  console.log('the database is connected ')
})
app.listen(process.env.PORT, () => {
  console.log(`the server is running on the PORT ${process.env.PORT}`)
})

//return all users:
app.get('/', (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json({ users: data })
    })
    .catch((error) => {
      res.status(401).json({ error: error })
    })
})

//add new user to the DB
app.post('/', (req, res) => {
  const user = req.body
  const newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
  newUser
    .save()
    .then((data) => {
      res.status(200).json({ message: 'the user is added', user: data })
    })
    .catch((error) => {
      res.status(401).json({ error: error })
    })
})

//edit user by ID
app.put('/:id', (req, res) => {
  const id = req.params.id
  const user = req.body
  User.findByIdAndUpdate(id, user, { new: true })
    .then((data) => {
      res.status(200).json({ message: 'the user is updated', user: data })
    })
    .catch((error) => {
      res.status(401).json({ error: error })
    })
})

//delete user by ID
app.delete('/:id', (req, res) => {
  const id = req.params.id
  USer.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'the user is deleted' })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})
