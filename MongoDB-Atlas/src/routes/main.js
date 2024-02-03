const express = require('express')
const { createCar, getCars, getCarById, updateCar, deleteMovie } = require('../controllers/carController')
const { carBodyMiddleware,UpdateCarMiddleware } = require('../middleware/carMiddleware')
const { register, login,deleteUser } = require('../controllers/userController')
const { getManuf, createManuf } = require('../controllers/manufacturerController')

const authenticateJWT = require('../middleware/jwtAuth')
const router = express.Router()

// auth
router.post('/api/register', register)
router.post('/api/login', login)
router.delete("/api/delete",authenticateJWT,deleteUser)
// router.get('/api/user',getUser)

// Cars
router.post('/api/cars',authenticateJWT,carBodyMiddleware,createCar)
router.get('/api/cars', getCars)
router.get('/api/car/:id', getCarById)
router.patch('/api/car/:id',authenticateJWT,UpdateCarMiddleware, updateCar)
router.delete('/api/car/:id',authenticateJWT, deleteMovie)

// Manufacturer
router.get('/api/manufacturers',getManuf)
router.post('/api/manufacturers',createManuf)


module.exports = router