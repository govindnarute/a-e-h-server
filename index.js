// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
const mongoose = require('mongoose');

var mongoString="mongodb+srv://admin:admin@cluster-a-e-h.srjhzqi.mongodb.net/test?retryWrites=true&w=majority"
// Create new instance of the express server
var app = express();


var cors = require('cors')
//app.use(cors())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
app.use(bodyParser.json());
const users=require('./routes/Users')
//mongoose.connect(mongoString);
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  //useCreateIndex: true, //make this true
  //autoIndex: true, //make this also true
  useUnifiedTopology: true
})
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.use("/users",users)

app.get("/api/email",function(req,res){
  
    res.status(200).json({ status: "email" });
})
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});