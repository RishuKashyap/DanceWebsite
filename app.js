const express = require("express");
const path = require("path"); 
const app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const port = 8000;

app.use(bodyParser.json())
// app.use(express.static('static'))
app.use(bodyParser.urlencoded({
    extended:true
}))

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
// app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('index.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


mongoose.connect('mongodb://localhost:27017/contactdb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
var db = mongoose.connection;

db.on('error',()=>{
    console.log("error in connecting to db");
})

db.once('open',()=>{
    console.log("connected to db");
})











// // EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('static')) // For serving static files
// // app.use(express.urlencoded ({extended: true}));

// // PUG SPECIFIC STUFF
// app.set('view engine', 'pug') // Set the template engine as pug
// app.set('views', path.join(__dirname, 'views')) // Set the views directory

// // app.get("/",(req,res)=>{
// //     res.set({
// //         "Allow-access-Allow-Origin":'*'
// //     })

// //     return res.redirect('/views/home.pug');
// // }).listen(3300);

// console.log("listening on port 8000");

// // ENDPOINTS
// app.get('/', (req, res)=>{
//     const con = "This is the best content on the internet so far so use it wisely"
//     const params = {}
//     res.status(200).render('index.pug', params);
// });
app.get('/contact', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('contact.pug', params);
});
// // app.post('/contact', (req, res)=>{
// //     let contact = new contactmd(req.body);
// //     contact.save().then(()=>{
// //         console.log(contact);
// //     res.status(240).send("This item has been saved to the database");
// //     })
// //     .catch(()=>{
// //     res.send({"message":"item was not saved to the databse"})
// // });
// //     // res.status(200).render('contact.pug');
// // });


// // START THE SERVER
// // app.listen(port, ()=>{
// //     console.log(`The application started successfully on port ${port}`);
// // });



app.post("/contact",(req,res)=>{
    var name = req.body.name;
    var age = req.body.age;
    var gender = req.body.gender;
    var mobile = req.body.mobile;
    var address = req.body.address;

    var data = {
        "name":name,
        "age":age,
        "gender":gender,
        "mobile":mobile,
        "address":address

    }

    db.collection('users').insertOne(data,(err,connection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    });
    return res.redirect('../static/signup_success.html');


});
