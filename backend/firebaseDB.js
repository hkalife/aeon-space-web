const serviceAccount = require('./serviceAccountKey.json')
const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()

module.exports = db