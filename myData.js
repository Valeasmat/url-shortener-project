let data=[]
let size=data.length

const createAndSaveUrl = (url) => {
  size++;
  let doc = {
    original_url: url,
    short_url:size
  };
  data.push(doc);
  return doc;
};

const findUrlById = (shortUrl) => {
  let doc=data.filter(n=>n.short_url==shortUrl);
  if(doc.length==1){
    return doc;
  }else {
    return {error: "No short URL found for the given input"}
  }
  return doc;
};


exports.createAndSaveUrl = createAndSaveUrl;
exports.findUrlById=findUrlById;
/**
app.get("/api/shorturl/:urlId?",function(req, res,next) {
  let urlId=req.urlId;
  let data=findById(urlId)
  res.json(data)
});
app.post("/api/shorturl",function (req, res,next) {
  let r=req.body
  console.log(req.body)
  let data=createAndSaveUrl(r.url)
  res.json(data);
})**/