import { JWT_SECRET } from "../config";
import { User } from "../db";


const express = require("express");
const { z } = require("zod");
const router = express.Router();
const jwt = require('jsonwebtoken')



const userValid = z.object({
  username: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string().min(8),
});

router.post("/signup", async (req, res) => {
  const { sucess } = userValid.safeParse(req.body);
  //   .safeParse(data:unknown): { success: true; data: T; } | { success: false; error: ZodError; }

  if (!success) {
    res.status(411).json({ message: "Email already taken / invalid inputs" });
  }

  const userAlreadyExists = await User.findOne({ username: req.body.username });

  if (userAlreadyExists) {
    res.json({ message: "User already exists" });
  }

  const user = User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  });

  const userId = user._id;

  const token = jwt.sign(userId, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});




router.post("/signin", async (req,res)=>{

   const signinBody = z.object({
    username: z.string().email(),
	  password: z.string()
})
   const { success } = signinBody.safeParse(req.body);

   if(!success){
       res.status(411).json({	message: "Error while logging in"})
   }

   const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
});

  if(user){
    const token = jwt.sign({
      userId: user._id
    } ,JWT_SECRET);
    
    res.json({
        token : token
      })
  }

  res.status(411).json({
    message: "Error while logging in"
  })

 
})