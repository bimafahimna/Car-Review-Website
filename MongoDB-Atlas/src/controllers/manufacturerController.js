const prisma = require("../config/prisma")

const createManuf = async (req,res)=>{
    let {manufacturer}=req.body
  
    let manuf = await prisma.manufacturer.create({
      data:{
        manufacturer:manufacturer
      }
    })
    res.json({manuf,info:"Manufacturer data successfully inputed"})
}

const getManuf = async (req,res)=>{
    try{
      let manuf = await prisma.manufacturer.findMany({
        include:{
            car:{
              select:{
                model:true,
                release_year:true
              }
            }
        }
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
        },
        include:{
          car:{
            select:{
              model:true,
              release_year:true
            }
          }
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

const updateManuf = async (req,res)=>{
  let {id} = req.params
  let {manufacturer} = req.body

  if (manufacturer !== undefined){
    try{

      let update_manuf = await prisma.manufacturer.update({
        where: {
          id: String(id)
        },
        data:{
          manufacturer:manufacturer,
          car:{
            disconnect:true,
          }
        }
      })
      
      res.json({update_manuf, info: "Manufacturer was successfully updated"})
   }catch(err){
      if (err.code === "P2025"){
        res.status(404).json({info: "data not found "})
      }else{
        res.status(500).json(err)
      }
    }
  }else{
    res.status(400).json({
      error: "manufacturer input is required"
    })
  }
}

const deleteManuf = async (req,res)=>{
  let {id} = req.params

  let manuf_id = await prisma.manufacturer.findUnique({
    where: {
      id:String(id)
    }
  })
  if (manuf_id) {
    try{
      await prisma.manufacturer.deleteMany({
        where:{
          id: String(id)
        }
      })
      res.json({info: "Manufacturer was successfully deleted"})
    }catch(err){
      res.status(404).json({info: "data not found"})
    }
  }else{
    return res.status(404).json({ message: "Manufacturer doesn't exists" });
  }
}


module.exports ={
    getManuf,
    createManuf,
    getManufById,
    updateManuf,
    deleteManuf
  }





