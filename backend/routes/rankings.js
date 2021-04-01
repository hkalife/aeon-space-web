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
  }).catch(error => {
    res.status(500).send(error);
  })
})

router.get('/niacoy', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').orderBy('global_score', 'desc').where('class', '==', 'Niacoy').limit(100).get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  }).catch(error => {
    res.status(500).send(error);
  })
})

router.get('/xeosor', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').orderBy('global_score', 'desc').where('class', '==', 'Xeosor').limit(100).get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  }).catch(error => {
    res.status(500).send(error);
  })
})

router.get('/vahean', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').orderBy('global_score', 'desc').where('class', '==', 'Vahean').limit(100).get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  }).catch(error => {
    res.status(500).send(error);
  })
})

router.get('/saxios', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').orderBy('global_score', 'desc').where('class', '==', 'Saxios').limit(100).get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  }).catch(error => {
    res.status(500).send(error);
  })
})

module.exports = router