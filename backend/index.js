var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
var cors = require('cors');
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'billG';

// Create a new MongoClient
const client = new MongoClient(url);

let db;

// Use connect method to connect to the Server
client.connect(function(err) {
  db = client.db(dbName);
});

app.post('/items' ,function(req,res){
    let items=[req.body];
    // console.log(user)
    db.collection('items').insertMany(items,(err,response) => {
        console.log(response)
    })
    // users.push(user);
    // res.send({"id" : (users.length)});
})
app.get('/home' ,function(req,res) {
    db.collection("items").find({}).toArray((err,response) => {
     res.json({"items":response})
    })
 })

 app.get('/show/:id' ,function(req,res){
    var userId = req.params["id"];
    let ObjectId=require("mongodb").ObjectID
    console.log(ObjectId)
    let id= new ObjectId(userId)
    console.log(id)
    db.collection('items').find({"_id" : id}).toArray((err,response) => {
        res.json({"items":response});
    })
    
})

app.post('/items/:id' ,function(req,res){
    var itemId = req.params["id"];
    let item=req.body
    console.log(item)
    let ObjectId=require("mongodb").ObjectID
    // console.log(ObjectId)
    let id= new ObjectId(itemId)
    console.log(id)
    db.collection('items').updateOne({"_id" : id},{$set: {"item":item.item,"rate":item.rate,"quantity":item.quantity,"discount":item.discount,"tax":item.tax}}),(err,response) => {
        res.json("Database updated");
    }
    
})
app.delete("/items/:id",function(req,res){
    const itemId =req.params["id"]
    const ObjectId = require("mongodb").ObjectId
    let id = new ObjectId(itemId)
    db.collection("items").deleteOne({"_id":id},function(err,response){
        res.send("Deleted Successfully")
        // console.log(response)
    })
   
})


app.listen(3002)