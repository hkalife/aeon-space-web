// imports and settings
const express = require('express');
const router = express.Router()
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const db = require('../firebaseDB')

//routes
router.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  })
})

router.get('/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('users').doc(req.params.id).get().then((response) => {
    res.send(response.data())
  });
})

router.get('/getByEmail/:email', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let user = []
  db.collection('users').where('email', '==', req.params.email).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      user.push(doc.data())
    })
    res.send(user)
  })
})

router.post('/', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  let newDoc = db.collection('users').doc()
  const newUser = {
    id: newDoc.id,
    ...req.body
  }

  newDoc.set(newUser).then(() => {
    res.send(newUser)
  })
})

router.put('/:id', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('users').doc(req.params.id).update(req.body).then(() => {
    res.send(req.body)
  })
})

module.exports = router