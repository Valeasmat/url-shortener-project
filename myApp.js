require('dotenv').config();
let mongoose=require('mongoose');
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const urlSchema = new Schema({
  original_url: String, 
  short_url: Number
});

let Url = mongoose.model('Url', urlSchema);
const findAllUrls=async (done)=>{
   await Url.find(function (err,docs){
     if (err) return console.log(err);
      done(null , docs);
  });
 
}
const createAndSaveUrl = async (url,done) => {
  await Url.find(function (err,docs){
     if (err) return console.log(err);
      let all=docs
      i=all.length+1
  });
  let doc = new Url({ 
    original_url: url,
    short_url:i
  });
  console.log(doc)
  doc.save(function (err,data) {
    if (err) return console.log(err);
    done(null , data);
  });
};

const findUrlById = (urlId,done) => {
  Url.findOne({ short_url: urlId }).select('original_url').exec((err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

exports.UrlModel = Url;
exports.createAndSaveUrl = createAndSaveUrl;
exports.findUrlById=findUrlById;
exports.findAllUrls=findAllUrls;