const express = require('express')
const app = express()

require('dotenv').config()

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/snco-calculator-backend');

const PORT = process.env.PORT || 5000;

const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors())

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

MongoClient.connect('mongodb+srv://dbUser:Loans$11211!@cluster0.opctt.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useUnifiedTopology: true })
  .then(client => {
    console.log("connected to Mongo DB!!!")
    const db = client.db('SNCO')
    const loansCollection = db.collection('Loans')

    app.get('/loans', (req,res)=>{
        loansCollection.find().toArray()
        .then(results => {
            res.json(results)
        })
        .catch(error => console.error(error))
    })

    app.get('/loans/:id', (req,res)=>{
        loansCollection.findOne({ _id: ObjectId(req.params.id) })
        .then(data=> {
            res.json(data)
        })
        .catch(error => console.error(error))
    })

    app.post('/loans', (req, res) => {
        const loan = (req.body);
        
        loansCollection.insertOne(loan)
        .then(result => {
            res.json(result.ops)
        })
        .catch(error => console.error(error))

    })

    // app.put('/contacts', (req,res)=>{
    //     contactsCollection.updateOne({ _id: ObjectId(req.body._id)}, {$set: {name: req.body.name, number: req.body.number, address: req.body.address} })
    //     res.json(bodyToResp)
    // })

    app.delete('/loans', (req, res) => {
        // loansCollection.deleteOne({ _id: ObjectId(req.body.id) })
        console.log(req.body.id)
    })
    // .then(result => {
    //     if (result.deletedCount === 0) {
    //       return res.json('No Loan to Delete')
    //     }
    //     res.json(`Deleted Loan`)
    // })
    // .catch(error => console.error(error))

  })
  .catch(error => console.error(error))


app.listen(PORT,()=> {
    console.log(`server started on ${PORT}`)
})