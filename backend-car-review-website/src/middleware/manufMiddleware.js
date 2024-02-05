const prisma = require("../config/prisma")

const ManufacturerChecker = async (req,res,next)=>{
    let {manufacturer} = req.body

    let manuf_check = await prisma.manufacturer.findUnique({
        where: {
          manufacturer:manufacturer
        }
      })
    
      if (manuf_check) {
        console.log(manuf_check.manufacturer)
        return res.status(409).json({ manuf_check: 'Manufacturer already exist' });
      }
      next()
}

const ManufInputChecker = async (req,res,next)=>{
    let {manufacturer} = req.body

    if (manufacturer === undefined){
        res.status(400).json({
            error: "Manufacturer input is required"
          })
    }else{
        next()
    }

}


module.exports = {
    ManufacturerChecker,
    ManufInputChecker
}
