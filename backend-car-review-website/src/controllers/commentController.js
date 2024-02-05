const prisma = require("../config/prisma")

const createComment = async (req,res)=>{
    // #swagger.tags = ['Comment']
    let {user_id,review_id} = req.params
    
    let {comment} = req.body

    try{
        let content = await prisma.comment.create({
            data:{
                comment:comment,
                review:{
                    connect:{id:String(review_id)}
                },
                user:{
                    connect:{id:String(user_id)}
                }
            }
        })
        res.json({content,info:"Comment successfully created"})
    }catch(err){
        res.status(500).json(err.message)
    }
}





module.exports={
    createComment
}


