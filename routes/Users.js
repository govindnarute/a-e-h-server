const express = require('express')
const router = express.Router()
const User=require("../model/User")

router.get("/",async (req,res)=>{


    try{
        const data = await User.find();
        res.json({
            success:true,
            message:"User fetch successfully",
            data:data
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

});
router.post('/',async (req, res) => {
    const data = new User({
        username: req.body.username,
        password: req.body.password,
        role:req.body.role
    })

    try {
        const user = await User.find({username:req.body.username});
       
        if(user.length>0){
            res.status(400).json({message: 'Record already present'})
            return
        }
        const dataToSave = data.save();
        res.status(200).json({message: 'Record saved successfully',success:true
    })
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})


router.post("/login",async(req,res)=>{
  const username=req.body.username
  const password=req.body.password
try{
const user= await User.find({username:username,password:password})
if(user.length>=0){
res.json({
    success:true,
    message:"User login successfully",
    user:user[0]
})
}else{
    res.json({
        success:false,
        message:"User not found"
    }) 
}
}catch(error){
    res.status(400).json({message: error.message})
}

})

router.delete("/:userId",async(req,res)=>{
let userId=req.params.userId
try{
    const user= await User.findByIdAndDelete({_id:userId})
    console.log(user)
    if(user){
    res.json({
        success:true,
        message:"User deleted successfully",
        user:user
    })}else{
        res.json({
            success:false,
            message:"User not found."
        })
    }


}catch(error){
    res.status(400).json({message: error.message})
}

})

module.exports=router