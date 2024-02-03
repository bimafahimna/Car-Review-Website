const express = require('express')

const { register, login,deleteUser } = require('../controllers/userController')

const { createCar, getCars, getCarById, updateCar, deleteCar } = require('../controllers/carController')
const { carBodyMiddleware,UpdateCarMiddleware } = require('../middleware/carMiddleware')

const { getManuf, createManuf, getManufById } = require('../controllers/manufacturerController')

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
router.delete('/api/car/:id',authenticateJWT, deleteCar)

// Manufacturer
router.get('/api/manufacturers',getManuf)
router.get('/api/manufacturer/:id',getManufById)
router.post('/api/manufacturers',createManuf)


module.exports = router