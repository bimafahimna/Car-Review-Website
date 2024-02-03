const carBodyMiddleware = (req,res, next)=>{
    let{manufacturer,model,image_link,release_year} = req.body

    if (model !== undefined && image_link !== undefined && manufacturer !== undefined && release_year !== undefined){
        next()
    }else{
        res.status(400).json({error:"manufacturer, model, release_year, and image_link is required"})
    }

}

const UpdateCarMiddleware = (req,res, next)=>{
    let{manufacturer,model,image_link} = req.body

    if (model !== undefined || image_link !== undefined || manufacturer !== undefined){
        next()
    }else{
        res.status(400).json({error:"Only accept manufacturer, model, release_year, or image_link variable input"})
        
    }

}

module.exports = {carBodyMiddleware,UpdateCarMiddleware}