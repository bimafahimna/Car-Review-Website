const express =  require('express')
const {getMovieById, getMovies, createMovie} =  require('../controllers/movieController')

const router = express.Router()

router.get('/api/movies', getMovies)
router.get('/api/movies/:id', getMovieById)
router.post('/api/movies', createMovie)

module.exports = router