const express = require('express')
const route = require('./src/routes/main')
const app =express()
const port = 3000

app.use(express.json())
app.use('/',route)

app.listen(port,()=>{
    console.log(`REST API PostgreSQL App listening to port ${port}`)
})


