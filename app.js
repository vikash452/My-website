const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const path=require("path");

const app=express();

app.use(express.static(__dirname+"/public/"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/author.html");
});

app.get("/skills.html",function(req,res){
    res.sendFile(__dirname+"/skills.html");
});

app.get("/signup.html",function(req,res){
    res.sendFile(__dirname+"/signup.html");
}); 

app.get("/contact.html",function(req,res){
    res.sendFile(__dirname+"/contact.html");
});

app.post("/signup.html",function(req,res){
    var fName=req.body.fName;
    var lastName=req.body.lName;
    var email=req.body.email;

    var data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                                FNAME:fName,
                                LNAME:lastName,
                            }

            }
        ]
    };

    var jsonData=JSON.stringify(data);

    var option={
        url:"https://us19.api.mailchimp.com/3.0/lists/b657080ede",
        method:"POST",
        headers:{
            "Authorization":"vikas 36fd38211cceaa076dfe776f7ab25247-us19"
        },
        body:jsonData
    };

    request(option,function(error,response,body){

        if(error)
        {
            res.sendFile(__dirname+"/failure.html");
        }
        else
        {
            if(response.statusCode===200)
                {
                    res.sendFile(__dirname+"/success.html");
                }
            else
                {
                    res.sendFile(__dirname+"/failure.html");
                }
        }

    });

});


app.post("/failure", function(req,res){
    res.redirect("/signup.html");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server running on port 3000");
});

//API KEY
//36fd38211cceaa076dfe776f7ab25247-us19
//id
//b657080ede
