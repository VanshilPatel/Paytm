const express = require("express");
const rootRouter = require("./routes/index");

const app = express()
const port = 3000

var cors = require('cors')

const mongoose = require('mongoose');

let uri = 'mongodb+srv://vanshil:vanshil123@cluster0.y9eqc21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


mongoose.connect(uri);


app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

