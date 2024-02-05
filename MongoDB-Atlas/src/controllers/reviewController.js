const prisma = require("../config/prisma")

const createReview = async (req,res)=>{
    let {id} = req.params
    
    let {title,review,rating} = req.body

    try{
        let content = await prisma.review.create({
            data:{
                title:title,
                review:review,
                rating:rating,
                cars:{
                    connect:{id:String(id)}
                }
            }
        })
        res.json({content,info:"Review successfully created"})
    }catch(err){
        res.status(500).json(err.message)
    }
}





module.exports={
    createReview
}


