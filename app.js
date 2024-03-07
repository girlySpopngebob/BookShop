import express, { response } from 'express'
import {PORT,MongoDBURL} from './config.js'
import  { MongoClient, ObjectId, ServerApiVersion } from "mongodb"
const app = express()


app.use (express.json())

const client = new MongoClient(MongoDBURL,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

const bookDSB = client.db("bookstore")
const mybooks = bookDSB.collection("books")

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    //show all the books
  return  res.status(200).send("<h1>Hello Nigger</h1>")})

app.get('/shop', (req, res) => {
  
    mybooks.find().toArray()
    .then(response=>{
     //    console.log(response)
       return res.status(200).send(response)
    })
    .catch(err =>console.log(err))
    //return res.status(200).send("<h1>Shop</h1>")
})

app.get('/shop/:id', (req, res) => {
    //show a specfic book
    const data = req.params 

    const filter= {
        "_id" : new ObjectId(data.id)
    }

    mybooks.findOne(filter)
    .then(response=>{
     //    console.log(response)
       return res.status(200).send(response)
    })
    .catch(err =>console.log(err))
    //return res.status(200).send(`<h1> Book: ${data.id}</h1>`)
})

app.post('/admin/savebook',(req, res) => {
    //add a new book
    const data = req.body
    if (!data.title)
    return res.status(400).send("No Title Nigger")
    if (!data.price)
    return res.status(400).send("No Price Nigger")
    if(!data.author)
    return res.status(400).send("No Author Nigger")
    mybooks.insertOne(data, (error, response) => {
        if (error){
            console.log("An error has occuried")
            return res.sendStatus(500)
        }
    })
    return res.status(200).send(JSON.stringify(data))
} )

app.delete('/admin/remove/:id', (req, res) =>{
    mybooks.deleteOne()
    .then(response=>{
     //    console.log(response)
       return res.status(200).send(response)
    })
    .catch(err =>console.log(err))
    
})

app.put('/admin/update/:id', (req, res) =>{
    const data = req.params
    const docData = req.body

    const filter ={
        "_id":new ObjectId (data.id)
    }

    const upDoc ={
        $set:{
            ...docData
        }
    }

    mybooks.updateOne(filter, upDoc)
    .then(response =>{
        res.status(200).send(response)
    })
    .catch(err =>console.log(err))

})