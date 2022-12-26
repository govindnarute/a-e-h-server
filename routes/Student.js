const express = require('express');
const Student = require('../model/Student');
const router = express.Router()
const User=require("../model/Student")

router.get("/",async (req,res)=>{


    try{
        const data = await Student.find();
        res.json({
            success:true,
            message:"Student fetch successfully",
            data:data
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

});
router.post('/',async (req, res) => {
    const data = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName:req.body.middleName,
        address:req.body.middleName,
        batchStartDate:req.body.batchStartDate,
        batchEndDate:req.body.batchEndDate,
        batchTime:req.body.batchTime,
        totalFee:req.body.totalFee,
        professionalSummery:req.body.professionalSummery,
        isFeePaid:req.body.isFeePaid,
        feeDetails:req.body.feeDetails

    })

    try {
        const student = await Student.find({firstName:req.body.firstName,lastName:req.body.lastName});
       
        if(student.length>0){
            res.status(400).json({message: 'Record already present',success:false})
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


router.delete("/:studentId",async(req,res)=>{
    let studentId=req.params.studentId
    try{
        const student= await Student.findByIdAndDelete({_id:studentId})
        console.log(student)
        if(student){
        res.json({
            success:true,
            message:"Student deleted successfully",
            student:student
        })}else{
            res.json({
                success:false,
                message:"Student not found."
            })
        }
    
    
    }catch(error){
        res.status(400).json({message: error.message})
    }
    
    })
    router.get("/:studentId",async(req,res)=>{
        let studentId=req.params.studentId
        try{
            const student= await User.findById({_id:studentId})
            console.log(student)
            if(student){
            res.json({
                success:true,
                message:"student fetch successfully",
                student:student
            })}else{
                res.json({
                    success:false,
                    message:"student not found."
                })
            }
        
        
        }catch(error){
            res.status(400).json({message: error.message})
        }
        
        })
    
    
        router.put("/:studentId",async(req,res)=>{
            let studentId=req.params.studentId
            let data={
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                middleName:req.body.middleName,
                address:req.body.middleName,
                batchStartDate:req.body.batchStartDate,
                batchEndDate:req.body.batchEndDate,
                batchTime:req.body.batchTime,
                totalFee:req.body.totalFee,
                professionalSummery:req.body.professionalSummery,
                isFeePaid:req.body.isFeePaid,
                //feeDetails:req.body.feeDetails
            }
            try{
                const student= await Student.findOneAndUpdate({_id:studentId},data)
                console.log(student)
                if(student){
                res.json({
                    success:true,
                    message:"student update successfully",
                    student:student
                })}else{
                    res.json({
                        success:false,
                        message:"student not found."
                    })
                }
            
            
            }catch(error){
                res.status(400).json({message: error.message})
            }
            
            })
    


module.exports=router