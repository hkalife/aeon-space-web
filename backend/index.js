// dependencies
const express = require('express')
var users = require('./routes/users');

// config - express
const app = express()

app.use('/users', users)

// listen
app.listen(process.env.PORT || 3000)