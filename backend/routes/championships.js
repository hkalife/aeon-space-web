// imports and settings
const express = require('express');
const router = express.Router()
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const db = require('../firebaseDB')

//routes
router.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let championships = []
  db.collection('championships').get().then(snapshot => {
    snapshot.forEach((doc) => {
      championships.push(doc.data())
    })
    res.send(championships)
  })
})

router.get('/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('championships').doc(req.params.id).get().then((response) => {
    res.send(response.data())
  });
})

router.post('/', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  let newDoc = db.collection('championships').doc()
  const newChampionship = {
    id: newDoc.id,
    ...req.body
  }

  newDoc.set(newChampionship).then(() => {
    res.send(newChampionship)
  })
})

router.put('/:id', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('championships').doc(req.params.id).update(req.body).then(() => {
    res.send(req.body)
  })
})

router.put('/subscribe/:id', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  db.collection('championships').doc(req.params.id).get().then((response) => {
    const championship = response.data()

    const newPlayer = {
      user_id: req.body.user_id,
      username: req.body.username,
      score: 0,
    }

    const newPlayersData = championship.players
    newPlayersData.push(newPlayer)

    const newPayloadForChampionship = {
      ...championship,
      players: newPlayersData
    }

    db.collection('championships').doc(req.params.id).update(newPayloadForChampionship).then(() => {
      res.send(newPayloadForChampionship)
    })
  })
})

router.put('/unsubscribe/:id', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  db.collection('championships').doc(req.params.id).get().then((response) => {
    const championship = response.data()
    let index = 0
    for (const player of championship.players) {
      if (player.user_id === req.body.user_id) {
        championship.players.splice(index, 1)
      }
      index++
    }

    db.collection('championships').doc(req.params.id).update(championship).then(() => {
      res.send(championship)
    })

  })
})

module.exports = router