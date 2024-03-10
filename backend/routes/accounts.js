const express = require('express');
const userRouter = require("./user");
const router = express.Router()
const { Account } = require ('../db');
const {authMiddleware} = require('../middleware')



router.get("/balance", authMiddleware, async (req,res)=>{
  
    const {balance} = await Account.findOne({
        userId: req.userId
    });

   if(balance){
    res.status(200).json({
        balance : balance
    })
   }

   res.status(411).json({
    message: "Can't fetch balance"
   })

})


router.post("/transfer", async (req,res)=>{

    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;
    const account = await Account.find({userId : req.userId}).session(session);

    if(!account){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.find({userId : to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    // https://stackoverflow.com/questions/51461952/mongodb-v4-0-transaction-mongoerror-transaction-numbers-are-only-allowed-on-a
    res.json({
        message : "Transfer Succesfull"
    })
})


module.exports = router;