const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
  info: {
    version: "2.0.0",
    title: 'Car Review REST API',
    description: 'Car Review REST API Documentation',
    
  },

  host: process.env.HOST,
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  components: {
    securitySchemes:{
        bearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
    }
  }
  
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')           // Your project's root file
})
