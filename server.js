const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

app.post("/register",(req,res)=>{
  const {email,password}=req.body;
  users.push({email,password});
  res.json({message:"User Registered"});
});

app.post("/login",(req,res)=>{
  const {email,password}=req.body;
  const user = users.find(u=>u.email===email && u.password===password);

  if(user){
    res.json({message:"Login Successful"});
  }else{
    res.json({message:"Invalid Credentials"});
  }
});

app.listen(5000,()=>console.log("Server running on port 5000"));






let messages = [];

app.post("/contact",(req,res)=>{
  const {name,email,message}=req.body;
  messages.push({name,email,message});
  res.json({message:"Message received"});
});