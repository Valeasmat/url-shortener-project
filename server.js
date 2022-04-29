require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser=require('body-parser');
const router = express.Router();
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));


app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use('/',function(req, res, next) {
  let log=`${req.method} ${req.path} - ${req.ip}`
  console.log(log);
  next();
})
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const Url = require("./myApp.js").UrlModel;

const findById = require("./myApp.js").findUrlById;
const findAllUrls = require("./myApp.js").findAllUrls;
const createAndSaveUrl = require("./myApp.js").createAndSaveUrl;

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/shorturl/:urlId?",function(req, res,next) {
  let urlId=req.params.urlId;
  console.log(urlId)
  findById(urlId, function (err, data) {
      if (err) {
        console.log(err)
          return next(err);
        }
      if(data!==null){
        res.redirect(data.original_url);
      }else{
        res.json({error: "No short URL found for the given input"})
      }
    
    });
});
const validate = require("./myValidator.js").validate;
app.post("/api/shorturl",async function (req, res,next) {
  let r=req.body
  console.log(req.body)
  if(!validate(r.url)){
    res.json({ error: 'invalid url' })
  }else{
    createAndSaveUrl(r.url,function (err, data) {
    if (err) {
       console.log(err)
          return next(err);
        }
    let obj={
      original_url:data.original_url,
      short_url:data.short_url
    }
      res.json(obj);
    });
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
