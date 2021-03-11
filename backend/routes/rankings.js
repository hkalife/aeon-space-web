// imports and settings
const express = require('express');
const router = express.Router()
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const db = require('../firebaseDB')

//routes
router.get('/global', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').orderBy('global_score', 'desc').limit(100).get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  })
})

router.get('/niacoy', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').where('class', '==', 'Niacoy').limit(100).get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  })
})

router.get('/xeosor', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').where('class', '==', 'Xeosor').limit(100).get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  })
})

router.get('/vahean', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').where('class', '==', 'Vahean').limit(100).get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  })
})

router.get('/saxios', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').where('class', '==', 'Saxios').limit(100).get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  })
})

module.exports = router