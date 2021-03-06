// dependencies
const express = require('express')
const admin = require('firebase-admin')
var bodyParser = require('body-parser')

// config - express
const app = express()

// config - body parser
const jsonParser = bodyParser.json()

// config - firebase
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()

// endpoint
app.get('/users', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let users = []
  db.collection('users').get().then(snapshot => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  })
})

app.get('/user/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('users').doc(req.params.id).get().then((response) => {
    console.log(response.data())
    res.send(response.data())
  });
})

app.post('/user', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  db.collection('users').doc().set(req.body).then(() => {
    res.send(req.body)
  })
})

app.put('/user/:id', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('users').doc(req.params.id).update(req.body).then(() => {
    res.send(req.body)
  })
})

// listen
app.listen(process.env.PORT || 3000)