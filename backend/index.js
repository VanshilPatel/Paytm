const express = require("express");

const app = express()
const port = 3000

var cors = require('cors')


app.use(cors());


const rootRouter = require("./routes/index");





app.use("/api/v1", rootRouter);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})