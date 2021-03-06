// dependencies
const express = require('express')
let users = require('./routes/users')
let championships = require('./routes/championships')
const Cors = require("cors");

// config - express
const app = express()

//cors
app.use(Cors());

app.use('/users', users)
app.use('/championships', championships)

// listen
app.listen(process.env.PORT || 3000)