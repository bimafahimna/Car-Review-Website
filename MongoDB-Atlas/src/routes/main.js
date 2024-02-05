const express = require('express')

const { register, login,deleteUser } = require('../controllers/userController')

const { createCar, getCars, getCarById, updateCar, deleteCar, getManufacturer } = require('../controllers/carController')
const { carBodyMiddleware,UpdateCarMiddleware, UniqueKeyChecker } = require('../middleware/carMiddleware')

const { ManufacturerChecker,ManufInputChecker } = require('../middleware/manufMiddleware')

const { createReview } = require('../controllers/reviewController')
const { CarCheckerforReview, ReviewChecker } = require('../middleware/reviewMiddleware')

const { createProfile } = require('../controllers/profileController')
const { UserCheckerforProfile, ProfileChecker } = require('../middleware/profileMiddleware')

const authenticateJWT = require('../middleware/jwtAuth')
const router = express.Router()

// auth
router.post('/api/register', register)
router.post('/api/login', login)
router.delete("/api/delete",authenticateJWT,deleteUser)

// Cars
router.get('/api/cars', getCars)
router.get('/api/car/:id', getCarById)
router.post('/api/cars', authenticateJWT, carBodyMiddleware, UniqueKeyChecker, createCar)
router.patch('/api/car/:id', authenticateJWT, UpdateCarMiddleware, UniqueKeyChecker,updateCar)
router.delete('/api/car/:id', authenticateJWT, deleteCar)

// Manufacturer
router.get('/api/manufacturers', getManufacturer)
// router.patch('/api/manufacturer/:id', authenticateJWT,ManufInputChecker,ManufacturerChecker, updateManuf)
// router.delete('/api/manufacturer/:id', authenticateJWT, deleteManuf)

//  Review
router.post('/api/reviews/:id', authenticateJWT, CarCheckerforReview, ReviewChecker, createReview)

// Profile
router.post('/api/profile/:id', authenticateJWT, UserCheckerforProfile, ProfileChecker, createProfile)



module.exports = router