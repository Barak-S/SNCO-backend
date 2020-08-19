const express = require('express')
const app = express()

// const Loan = require("./models/Loan")

const PORT = 5000;

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
        let loan = loansCollection.findOne({ _id: ObjectId(req.params._id) })
        console.log(loan)
        // res.send(loan)
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

    // app.delete('/contacts', (req, res) => {
    //     contactsCollection.deleteOne({ _id: ObjectId(req.body._id) })
    // })
    // .then(result => {
    //     if (result.deletedCount === 0) {
    //       return res.json('No quote to delete')
    //     }
    //     res.json(`Deleted Darth Vadar's quote`)
    // })
    // .catch(error => console.error(error))

  })
  .catch(error => console.error(error))


app.listen(PORT,()=> {
    console.log(`server started on ${PORT}`)
})