const prisma = require("../config/prisma")

const CreateMovie = async (req,res)=>{
  let {title, year} = req.body
  let {id:UserId} = req.user

  if (title !== undefined && year !== undefined){
   try {
    let movie = await prisma.movie.create({
      data: {title, year: Number(year), UserId}
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

const getMovies = async (req,res)=>{
  try{
    let movies = await prisma.movie.findMany()
    res.json(movies)
  }catch(err){
    res.status(500).json({err})
  }
}

const getMovieByid = async (req,res)=>{
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

const updateMovie = async (req,res)=>{
  let {id} = req.params
  let {title, year} = req.body
  if (title !== undefined && year !== undefined){
    try{
      let movie = await prisma.movie.update({
        where: {
          id: Number(id)
        },
        data:{
          title, year
        }
      })
      
      res.json({movie, info: "movie was successfully updated"})

    }catch(err){
      if (err.code === "P2025"){
        res.status(404).json({info: "data not found "})
      }else{
        res.status(500).json(err)
      }
    }
  }else{
    res.status(400).json({
      error: "title and year is required"
    })
  }
}

const deleteMovie = async (req,res)=>{
  let {id} = req.params
  try{
    await prisma.movie.delete({
      where:{
        id: Number(id)
      }
    })
    res.json({info: "movie was successfully deleted"})
  }catch(err){
    res.status(404).json({info: "data not found"})
  }
}

module.exports ={
  CreateMovie,
  getMovies,
  getMovieByid,
  updateMovie,
  deleteMovie
}