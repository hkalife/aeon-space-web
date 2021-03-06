// dependencies
const express = require('express')
let users = require('./routes/users')
let championships = require('./routes/championships')

// config - express
const app = express()

app.use('/users', users)
app.use('/championships', championships)

// listen
app.listen(process.env.PORT || 3000)