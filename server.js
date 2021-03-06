const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.connectionURL



MongoClient.connect(connectionString, {useUnifiedTopology: true })
    .then(client => {
        console.log('connected to database')
        const db = client.db('star-wars-quotes')
        const quotescollection = db.collection('quotes')

        app.listen(process.env.PORT, function(){
            console.log(`listening on ${process.env.PORT}`)
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
            //console.log(req.body)
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
                    //console.log(result) //darth vader replacer button log
                    res.json('Success')
                })
                .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
            quotescollection.deleteOne(
                { name: req.body.name }
            )
                .then(result => {
                    if(result.deletedCount === 0) {
                        return res.json('No quote to delete')
                    }
                    res.json(`deleted Darth Vader's quote`)
                })
                .catch(error => console.log(error))
        })

    })
    .catch(error => console.error(error))