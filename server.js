const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

const connectionString = 'mongodb+srv://vader:luke1997molly02@cluster0.0lvwr.mongodb.net/star-wars-quotes?retryWrites=true&w=majority'



MongoClient.connect(connectionString, {useUnifiedTopology: true })
    .then(client => {
        console.log('connected to database')
        const db = client.db('star-wars-quotes')
        const quotescollection = db.collection('quotes')

        app.listen(3000, function(){
            console.log('listening on 3000')
        })

        app.set('view engine', 'ejs')//*Needs to be placed before any app.use, app.get or app.post methods

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static('public'))
        app.use(bodyParser.json())

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(quotes => {
                    res.render('index.ejs', { quotes: quotes })
                })
                .catch(error => console.error(error))

        })

        app.post('/quotes', (req, res) => {
            quotescollection.insertOne(req.body)
                .then(result =>{
                    //console.log(req.body)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/quotes',(req, res) => {
            console.log(req.body)
            quotescollection.findOneAndUpdate(
                {name: 'Yoda'},
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true
                })
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))