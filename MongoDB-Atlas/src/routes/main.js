const express = require('express')
const { CreateMovie, getMovies, getMovieByid, updateMovie, deleteMovie } = require('../controllers/movieController')
const { movieBodyMiddleware } = require('../middleware/movieMiddleware')
const { register, login } = require('../controllers/authController')
const authenticateJWT = require('../middleware/jwtAuth')
const router = express.Router()


router.post('/movies', authenticateJWT, movieBodyMiddleware, CreateMovie)
router.get('/movies', getMovies)
router.get('/movies/:id', getMovieByid)
router.patch('/movies/:id', updateMovie)
router.delete('/movies/:id', deleteMovie)

// auth
router.post('/register', register)
router.post('/login', login)


module.exports = router