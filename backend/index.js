// dependencies
const express = require('express')

//config - express
const app = express()

// endpoint
app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.get('/teste', (request, response) => {
  let tests = {
    id: 123456,
    test: 'test'
  }
  response.send(tests)
})

// listen
app.listen(3000)