
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const app = express()
const port = 3000

app.use(express.static("public"));  // to get the access of the static things in our project like CSS and Images
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/signup.html");
})

app.post('/', function(req,res){
  const Fname = req.body.fname;
  const Lname =req.body.lname;
  const Email = req.body.email;

  var data = {
    members: [ {
      email_address: Email,
      status: "subscribed",
      merge_fields: {
        FNAME: Fname,
        LNAME: Lname,
      }
    }
  ]
};


const jsonData = JSON.stringify(data);
const url = "https://us14.api.mailchimp.com/3.0/lists/e6aff69cdc"
  // console.log(req.body.fname);
  // console.log(req.body.lname);
  // console.log(req.body.email);

  // https.request(url, options, function(response)){
  //
  //
  // }
const options = {
  method: 'POST',
  auth: "anyString:1fb20a62d483f6d2f997ea2108def6ea-us14"
}
   const request = https.request(url, options, function(response){

     if(response.statusCode == 200){
       res.sendFile(__dirname+"/success.html")
     }else{
       res.sendFile(__dirname+"/failure.html")
     }

       response.on("data", function(data){
         console.log(JSON.parse(data));
       })

  })

request.write(jsonData);
request.end();

});

app.listen(process.env.PORT || port, () => {
  console.log('server is enable at port 3000');
})



// API Key
// 19d3a0759572ec3d826763cef1ec9052-us14
//  1fb20a62d483f6d2f997ea2108def6ea-us14
// Audience id e6aff69cdc
// URL : - https://usX.api.mailchimp.com/3.0/lists

'https://${dc}.api.mailchimp.com/3.0/lists/{list_id}'
