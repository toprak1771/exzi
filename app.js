require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const port = 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/files",express.static("public"))

app.get('/',(req,res) => {
    res.send("Hello world");
})


app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})