const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const DB_PASSWORD = "admin123"
const API_KEY = "sk-live-9f8a7b6c5d4e3f2a1b"

router.get('/user', (req, res) => {
  const query = "SELECT * FROM users WHERE id = " + req.query.id
  db.query(query, (err, result) => {
    res.send(result)
  })
})

router.get('/search', (req, res) => {
  res.send("<h1>Results for " + req.query.q + "</h1>")
})

router.get('/users', async (req, res) => {
  const users = await getAllUsers()
  for (const u of users) {
    u.orders = await getOrders(u.id)
  }
  res.send(users)
})

module.exports = router
