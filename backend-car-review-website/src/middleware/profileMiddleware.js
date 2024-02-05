const prisma = require("../config/prisma")

const UserCheckerforProfile = async (req,res,next)=>{
    let {id} = req.params

    let user_id = await prisma.user.findUnique({
        where: {
          id:String(id)
        }
    })
    
    if (user_id) {
        next()
    }else{
        return res.status(409).json({ message: "User doesn't exist" });
    }
}

const ProfileChecker = async (req,res,next)=>{
    let {id} = req.params

    let profile_checker = await prisma.profile.findUnique({
        where: {
          userId:String(id)
        }
    })

    if (profile_checker) {
        return res.status(409).json({ message: 'Profile for this User is already exist' });
    }else{
        next()
    }
}

module.exports={
    UserCheckerforProfile,
    ProfileChecker
}