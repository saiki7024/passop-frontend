const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config()
const port = 3000
app.use(bodyParser.json())
app.use(cors())


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

client.connect();

//Get all passwords
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//post a password
app.post('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password)
    res.send({success:true, result:findResult})
})

//Delete a password
app.delete('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password)
    res.send({success:true, result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})