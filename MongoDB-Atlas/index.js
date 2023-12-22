const express = require('express')
const mainRoutes = require('./src/routes/main');
const mongoose = require("mongoose")
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/database_movie_sanbercampus');

app.use(express.json())
app.use('/', mainRoutes)

app.listen(port, () => {
  console.log(`REST API MySQL App listening on port ${port}`)
})