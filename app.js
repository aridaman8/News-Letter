
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/" , function(req,res){
  res.sendFile(__dirname +"/singup.html");


})

app.post("/" , function(req,res){

const first=req.body.first;
const last=req.body.last;
const email=req.body.email;

var url="https://us21.api.mailchimp.com/3.0/lists/e5ac4f0bb2";

var data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:first,
        LNAME:last
      }
    }
  ]
};

var jsonData=JSON.stringify(data);

const option={
  method:"POST",
  auth:"raju:cb18316f6d5774fbdf4d65bf15564a43-us2"
}

const request=https.request(url,option,function(response){

if(response.statusCode ===200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");

}

})

request.write(jsonData);
request.end();


})


app.post("/failure" , function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){

  console.log("Server running at 3000");
})

//cb18316f6d5774fbdf4d65bf15564a43-us21

//e5ac4f0bb2
