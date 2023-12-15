const prisma = require("../config/prisma")
 
const getMovies = async (req,res)=>{
  try{
    let movies = await prisma.movie.findMany()
    res.json(movies)
  }catch(err){
    res.status(500).json({err})
  }
}

const getMovieById = async (req,res)=>{
  let {id} = req.params
  try{
    let movie = await prisma.movie.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (movie){
      res.json(movie)
    }else{
      res.status(404).json({info: "data not found"})
    }
  }catch(err){
    res.status(404).json({info: "data not found"})
  }
}

// tambahkan kode dibawah ini
const createMovie = async (req,res)=>{
    let {title, year} = req.body
    if (title !== undefined && year !== undefined){
     try {
      let movie = await prisma.movie.create({
        data: {title, year: Number(year)}
      })
      res.json({movie, info: "movie was successfully created"})
     }catch(err){
      res.status(500).json({err})
     }
    }else{
      res.status(400).json({
        error: "title and year is required"
      })
    }
  }
  

module.exports = {
  getMovieById,
  getMovies,
  createMovie
}