const prisma = require("../config/prisma")

const carBodyMiddleware = (req,res, next)=>{
    let{manufacturer,model,image_link,release_year} = req.body

    if (model !== undefined && image_link !== undefined && manufacturer !== undefined && release_year !== undefined){
        next()
    }else{
        res.status(400).json({error:"manufacturer, model, release_year, and image_link is required"})
    }

}

const UpdateCarMiddleware = (req,res, next)=>{
    let{manufacturer,model,release_year,image_link} = req.body

    if (model !== undefined || image_link !== undefined || manufacturer !== undefined && release_year !== undefined){
        next()
    }else{
        res.status(400).json({error:"Only accept manufacturer, model, release_year, or image_link variable input"})
        
    }

}

const UniqueKeyChecker = async (req,res,next)=>{
    let {manufacturer,model,release_year,image_link} = req.body

    let unique_key = String(manufacturer)+" "+String(model)+" "+String(release_year)

    let car_model = await prisma.car.findUnique({
        where: {
          unique_key:unique_key
        }
      })
    
      if (car_model) {
        return res.status(409).json({ message: 'Car already exist' });
      }
      next()
}


module.exports = {
    carBodyMiddleware,
    UpdateCarMiddleware,
    UniqueKeyChecker
}