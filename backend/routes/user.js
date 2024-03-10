const { JWT_SECRET } = require("../config");
const { User }  = require("../db");
const {authMiddleware} = require('../middleware');


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
  const { success } = userValid.safeParse(req.body);
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

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000
})

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


const updatedBody = z.object({
  firstname : z.string().optional(),
  lastname : z.string().optional(),
  password : z.string().optional(),

})

router.put('/', authMiddleware, async (req,res)=>{
   
  const {success} = updatedBody.safeParse(req.body);

  if(!success){
    res.status(411).json({
      message: "Error while updating information"
    }) } 

  await User.updateOne({_id : req.userId}, req.body);


  res.json({
    message: "Updated successfully"
})
})



router.get("/bulk", async (req,res)=>{
  let filter = req.query.filter;

  const users = await User.find({
    $or: [{
      firstName: {
          "$regex": filter
      }
  }, {
      lastName: {
          "$regex": filter
      }
  }]
  });

  res.json({
    user: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }))
})

})



module.exports = router;