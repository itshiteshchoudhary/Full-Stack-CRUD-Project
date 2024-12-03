const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// http://localhost:8080

const app = express()
app.use(cors())
app.use(express.json())

//read
app.get('/',async(req,res)=>{
    const data = await userModel.find({})
    res.json({ data :data , success : true})
})

//creat
app.post('/create',async(req,res)=>{
    // console.log(req.body); 
    const {name , email , mobile} = req.body  
    const newUser =await userModel.create({name , email , mobile})
    res.send({success:true , message : "new user created successfully",newUser})
})

//update
app.patch("/update",async(req,res)=>{
    // console.log(req.body);
    const {_id, ...rest} = req.body
    // console.log(rest);    
    const data = await userModel.updateOne({_id : req.body._id},rest)
    res.send({success : true , message : "data Updated" , data})    
})

//delete
app.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params

    // try {
    //     const deleteResult = await userModel.deleteOne({ _id: id });

    //     if (deleteResult.deletedCount === 0) {
    //         return res.status(404).send({ success: false, message: "User not found" });
    //     }

    //     res.send({ success: true, message: "Data deleted successfully" });
    // } catch (error) {
    //     console.error("Error deleting user:", error);
    //     res.status(500).send({ success: false, message: "Error deleting data", error: error.message });
    // }

    const deleteResult= await userModel.deleteOne({_id : id})
    // if (deleteResult.deletedCount === 0) {
    //     return res.status(404).send({ success: false, message: "User not found" });
    // }
    res.send({success : true , message :"Data Deleted successfully"})
})

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        require : [true , "Name is required"]
    },
    email :{
        type : String,
        require : [true , "Email is required"]
    },
    mobile : {
        type : String,
        require : [true , "Mobile Number  is required"]
    }
},{timestamps : true})

const userModel = mongoose.model("User",userSchema)

const PORT = process.env.PORT || 8080
mongoose.connect(process.env.MongoDB_Url)
.then(()=>{
    console.log("MongoDB connected successfully");
    app.listen(PORT , ()=>console.log(`server is connected to PORT ${PORT}`))
})
.catch((err)=>{console.log("MongoDB connection fail" , err)})


