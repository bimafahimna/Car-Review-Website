const express = require('express')
const { createMovie, getMovies, getMovieByid, updateMovie, deleteMovie } = require('../controllers/movieController')
const { movieBodyMiddleware } = require('../middleware/movieMiddleware')
const { register, login } = require('../controllers/authController')
const authenticateJWT = require('../middleware/jwtAuth')
const router = express.Router()


router.post('/api/movies',authenticateJWT,movieBodyMiddleware,createMovie)
router.get('/api/movies', getMovies)
router.get('/api/movies/:id', getMovieByid)
router.patch('/api/movies/:id', updateMovie)
router.delete('/api/movies/:id', deleteMovie)

// auth
router.post('/api/register', register)
router.post('/api/login', login)


module.exports = router