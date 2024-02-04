const express = require('express')

const { register, login,deleteUser } = require('../controllers/userController')

const { createCar, getCars, getCarById, updateCar, deleteCar } = require('../controllers/carController')
const { carBodyMiddleware,UpdateCarMiddleware, UniqueKeyChecker } = require('../middleware/carMiddleware')

const { getManuf, createManuf, getManufById,updateManuf, deleteManuf } = require('../controllers/manufacturerController')
const { ManufacturerChecker,ManufInputChecker } = require('../middleware/manufMiddleware')

const authenticateJWT = require('../middleware/jwtAuth')
const router = express.Router()

// auth
router.post('/api/register', register)
router.post('/api/login', login)
router.delete("/api/delete",authenticateJWT,deleteUser)
// router.get('/api/user',getUser)

// Cars
router.get('/api/cars', getCars)
router.get('/api/car/:id', getCarById)
router.post('/api/cars', authenticateJWT, carBodyMiddleware, UniqueKeyChecker, createCar)
router.patch('/api/car/:id', authenticateJWT, UpdateCarMiddleware, UniqueKeyChecker,updateCar)
router.delete('/api/car/:id', authenticateJWT, deleteCar)

// Manufacturer
router.get('/api/manufacturers', getManuf)
router.get('/api/manufacturer/:id', getManufById)
router.post('/api/manufacturers', authenticateJWT,ManufInputChecker, ManufacturerChecker, createManuf)
router.patch('/api/manufacturer/:id', authenticateJWT,ManufInputChecker,ManufacturerChecker, updateManuf)
router.delete('/api/manufacturer/:id', authenticateJWT, deleteManuf)


module.exports = router