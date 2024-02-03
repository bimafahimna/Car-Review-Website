const prisma = require("../config/prisma")

const createManuf = async (req,res)=>{
    let {manufacturer}=req.body
  
    let manuf_comp = await prisma.manufacturer.findUnique({
      where: {
        manufacturer
      }
    })
    if (manuf_comp) {
      return res.status(409).json({ message: 'Manufacturer already exists' });
    }
    let manuf = await prisma.manufacturer.create({
      data:{
        manufacturer}
    })
    res.json({manuf,info:"Manufacturer data successfully inputed"})
  }

const getManuf = async (req,res)=>{
    try{
      let manuf = await prisma.manufacturer.findMany({
        include:{car_model:true}
      })
      if (manuf.length != 0){
        res.json(manuf)
      }else{
        res.status(404).json({info: "data not found"})
      }
    }catch(err){
      res.status(404).json({info: "data not found"})
    }
}

const getManufById = async (req,res)=>{
    let {id} = req.params
    try{
      let manuf = await prisma.manufacturer.findUnique({
        where: {
          id: String(id)
        },include:{
            car_model:true
        }
      })
      if (manuf){
        res.json(manuf)
      }else{
        res.status(404).json({info: "data not found"})
      }
    }catch(err){
      res.status(404).json({info: "data not found"})
    }
  
  }

module.exports ={
    getManuf,
    createManuf,
    getManufById
  }





