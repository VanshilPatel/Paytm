const express = require("express");
const rootRouter = require("./routes/index");

const app = express()
const port = 3000

var cors = require('cors')

const mongoose = require('mongoose');

let uri = 'mongodb://localhost:3000/paytm'


mongoose.connect(uri);


app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

