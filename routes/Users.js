const express = require('express')
const router = express.Router()
const User=require("../model/User")

router.get("/",async (req,res)=>{

    try{
        const data = await User.find();
        res.json(data)
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
        const data = await User.find({username:req.body.username});
       
        if(data.length>0){
            res.status(400).json({message: 'Record already present'})
            return
        }
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})



module.exports=router