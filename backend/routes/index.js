const express = require('express')

export const router = express.Router()





const userRouter = require("./user");
router.use("/user", userRouter)

