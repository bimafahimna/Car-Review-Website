const prisma = require("../config/prisma")

const createProfile = async (req,res)=>{
    let {id} = req.params
    
    let {bio,email_news} = req.body

    try{
        let content = await prisma.profile.create({
            data:{
                bio:bio,
                email_news:email_news,
                user:{
                    connect:{id:String(id)}
                }
            }
        })
        res.json({content,info:"Profile successfully created"})
    }catch(err){
        res.status(500).json(err.message)
    }
}





module.exports={
    createProfile
}


