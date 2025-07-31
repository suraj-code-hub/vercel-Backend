const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require("bcryptjs");

const PORT = 5000

const app = express()
const MONGB_UR="mongodb://localhost:27017/ytLogin"

// mdillrwre
app.use(cors())
app.use(express.json())
mongoose.connect(MONGB_UR)
const db=mongoose.connection;
db.on('error',(err)=>{
    console.error("Mongodb connection error",err)
})
db.once('open',()=>{
    console.log('Mongodb is connected')
})

// create Schema
const userSchema = new mongoose.Schema({
    // First_Name:String,
    Name:String,
    Email:String,
    Phone_Number:String,
    Company:String,
    Type_of_Business:String,
    Type_of_Website_You_Need:String,
    Navigation_Bar_Item:String,
    More_Items:String,
    Additional_Service:String,
    password:String
})

// create Model
const User=mongoose.model('User',userSchema)

// create route
app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})

app.post('/register',async(req,res)=>{
   try{

    // password for secure
    const hasspassword = await bcryptjs.hashSync(req.body.password,10);

     const newUser = new User({
        // Full_Name:req.body.Full_Name,
        Name:req.body.Name,
        Email:req.body.Email,
        Phone_Number:req.body.Phone_Number,
        Company:req.body.Company,
        Type_of_Business:req.body.Type_of_Business,
        Type_of_Website_You_Need:req.body.Type_of_Website_You_Need,
        Navigation_Bar_Item:req.body.Navigation_Bar_Item,
        More_Items:req.body.More_Items,
       Additional_Service:req.body.Additional_Service,
       
       // this line is for password secure
        password:hasspassword
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    } catch(error){
        console.error("Error druing registration",error);
        res.status(500).json({ error:"inter server error"});
    }
});

app.listen(PORT)




