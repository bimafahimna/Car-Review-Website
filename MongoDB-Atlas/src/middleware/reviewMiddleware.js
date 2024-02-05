const prisma = require("../config/prisma")


const CarCheckerforReview = async (req,res,next)=>{
    let {id} = req.params

    let car_model = await prisma.car.findUnique({
        where: {
          id:String(id)
        }
    })
    
    if (car_model) {
        next()
    }else{
        return res.status(409).json({ message: "Car doesn't exist" });
    }
}

const ReviewChecker = async (req,res,next)=>{
    let {id} = req.params

    let car = await prisma.car.findUnique({
        where: {
          id:String(id)
        }
    })
    
    let review_check = await prisma.review.findUnique({
        where: {
            car:car.unique_key
        }
    })

    if (review_check) {
        return res.status(409).json({ message: 'Review for this Car is already exist' });
    }else{
        next()
    }
}

module.exports={
    CarCheckerforReview,
    ReviewChecker
}