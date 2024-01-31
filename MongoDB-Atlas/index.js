const express = require('express')
const mainRoutes = require('./src/routes/main');
const cors = require('cors')
const app = express()
const port = 1234

var corsOptions = {
  origin: 'http://localhost:1234', // ini merupakan host frontend yang nantinya akan menggunakan backend ini
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())
app.use(express.json())
app.use('/', mainRoutes)

app.listen(port, () => {
  console.log(`REST API MongoDB Atlas App listening on port ${port}`)
})