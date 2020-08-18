const express = require('express')
const app = express()

const Loan = require("./models/Loan")

const PORT = 5000;
// [
const bodyParser= require('body-parser')
// ^^ must be before CRUD handlers
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// ]
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
        db.collection('Loans').find().toArray()
        .then(results => {
            res.json(results)
        })
        .catch(error => console.error(error))
    
    })

    // app.get('/contacts/:id', (req,res)=>{
    //     Contact.findById(req.params.id, (err, contact) => {
    //         if (err) throw err;
    //         res.json({ contact });
    //     })
    // })

    app.post('/loans', (req, res) => {
        const loan = (req.body);
        
        loansCollection.insertOne(loan)
        .then(result => {
            res.send(result.ops)
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