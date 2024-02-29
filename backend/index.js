const express = require("express");
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000

var cors = require('cors')


app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);


const rootRouter = require("./routes/index");


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

