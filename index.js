var bodyParser = require('body-parser')
var express = require("express")
const env = require('dotenv')
var app = express()
var router = require("./src/routes/routes")

env.config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router);

app.listen(process.env.PORT,() => {
    console.log("Server is running")
    console.log('http://localhost:'+process.env.PORT)
});
