const express = require('express')
const mainRoutes = require('./src/routes/main');
const app = express()
const port = 1234


app.use(express.json())
app.use('/', mainRoutes)

app.listen(port, () => {
  console.log(`REST API MongoDB Atlas App listening on port ${port}`)
})