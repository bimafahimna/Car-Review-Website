const express = require('express')
const mainRoutes = require('./src/routes/main');
const cors = require('cors')
const app = express()
const port = 90
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

var corsOptions = {
  origin: 'http://localhost:1234', // ini merupakan host frontend yang nantinya akan menggunakan backend ini
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())
app.use(express.json())
app.use('/', mainRoutes)

/* Middlewares */
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => {
  console.log(`REST API MongoDB Atlas App listening on port ${port}\nAPI documentation: http://localhost:90/doc`)
})