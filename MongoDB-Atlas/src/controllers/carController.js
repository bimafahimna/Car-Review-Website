const prisma = require("../config/prisma")

const createCar = async (req,res)=>{
  let {manufacturer,model,image_link,release_year}=req.body
  let unique_key = String(manufacturer)+" "+String(model)+" "+String(release_year)
  
  let car_model = await prisma.car.findUnique({
    where: {
      unique_key:unique_key
    }
  })

  if (car_model) {
    return res.status(409).json({ message: 'Car already exists' });
  }

  try{
    let car = await prisma.car.create({
      data:{
        unique_key:unique_key,
        image_link:image_link,
        manufacturers:{
          connectOrCreate:{
            where:{manufacturer:manufacturer},
            create:{manufacturer:manufacturer}
          }
        },
        models:{
          connectOrCreate:{
            where:{model:model},
            create:{model:model}
          }
        },
        release_years:{
          connectOrCreate:{
            where:{release_year:String(release_year)},
            create:{release_year:String(release_year)}
          }
        }
      }
    })
    
      res.json({car,info:"Car successfully inputed"})
    }catch(err){
    if (err.code === "P2025"){
      res.status(404).json({info: "data not found "})
    }else{
      res.status(500).json(err)
    }
  }
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
    res.status(500).json(err)
  }
}

const getCarById = async (req,res)=>{
  let {id} = req.params
  try{
    let car = await prisma.car.findUnique({
      where: {
        id: String(id)
      }
    })
    if (car){
      res.json(car)
    }else{
      res.status(404).json({info: "data not found"})
    }
  }catch(err){
    res.status(500).json(err)
  }

}

const updateCar = async (req,res)=>{
  let {id} = req.params
  let {manufacturer,model,release_year,image_link} = req.body

  let unique_key = String(manufacturer)+" "+String(model)+" "+String(release_year)

  let car_model = await prisma.car.findUnique({
    where: {
      unique_key:unique_key
    }
  })

  if (car_model) {
    return res.status(409).json({ message: 'Car already exists' });
  }

  if (model !== undefined || image_link !== undefined || manufacturer !== undefined){
    try{
      let car = await prisma.car.update({
        where: {
          id: String(id)
        },
        data:{
          unique_key:unique_key,
          image_link:image_link,
          manufacturers:{
            connectOrCreate:{
              where:{manufacturer:manufacturer},
              create:{manufacturer:manufacturer}
            }
          },
          models:{
            connectOrCreate:{
              where:{model:model},
              create:{model:model}
            }
          },
          release_years:{
            connectOrCreate:{
              where:{release_year:String(release_year)},
              create:{release_year:String(release_year)}
            }
          }
        }
      })
      
      res.json({car, info: "Car was successfully updated"})
   }catch(err){
    res.status(500).json(err)
      }
  }else{
    res.status(400).json({
      error: "manufacturer, model, release_year, and image_link is required"
    })
  }
}

const deleteCar = async (req,res)=>{
  let {id} = req.params

  let car_id = await prisma.car.findUnique({
    where: {
      id:String(id)
    }
  })
  if (car_id) {
    try{
      await prisma.car.deleteMany({
        where:{
          id: String(id)
        }
      })
      res.json({info: "Car was successfully deleted"})
    }catch(err){
      res.status(404).json({info: "data not found"})
    }
  }else{
    return res.status(404).json({ message: "Car doesn't exists" });
  }
}

module.exports ={
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar
}