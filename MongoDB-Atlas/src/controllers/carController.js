const prisma = require("../config/prisma")

const createCar = async (req,res)=>{
  let {manufacturer,model,image_link}=req.body

  let car_model = await prisma.car.findUnique({
    where: {
      model
    }
  })
  if (car_model) {
    return res.status(409).json({ message: 'Car already exists' });
  }
  let car = await prisma.car.create({
    data:{
      model:model,
      image_link:image_link,
      manufacturer_name:{
        connect:{manufacturer}
      }}
  })
  res.json({car,info:"Car data successfully inputed"})
}


const getCars = async (req,res)=>{
  try{
    let cars = await prisma.car.findMany()
    if (cars.length != 0){
      res.json(cars)
    }else{
      res.status(404).json({info: "data not found"})
    }
  }catch(err){
    res.status(404).json({info: "data not found"})
  }
}

const getCarById = async (req,res)=>{
  let {id} = req.params
  try{
    let movie = await prisma.car.findUnique({
      where: {
        id: String(id)
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

const updateCar = async (req,res)=>{
  let {id} = req.params
  let {manufacturer,model,image_link} = req.body
  if (model !== undefined || image_link !== undefined || manufacture !== undefined){
    try{
      let car = await prisma.car.update({
        where: {
          id: String(id)
        },
        data:{
          manufacturer,model,image_link
        }
      })
      
      res.json({car, info: "Car data was successfully updated"})
   }catch(err){
      if (err.code === "P2025"){
        res.status(404).json({info: "data not found "})
      }else{
        res.status(500).json(err)
      }
    }
  }else{
    res.status(400).json({
      error: "manufacturer, model, and image_link is required"
    })
  }
}

const deleteMovie = async (req,res)=>{
  let {id} = req.params
  try{
    await prisma.movie.deleteMany({
      where:{
        id: String(id)
      }
    })
    res.json({info: "movie was successfully deleted"})
  }catch(err){
    res.status(404).json({info: "data not found"})
  }
}

module.exports ={
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteMovie
}