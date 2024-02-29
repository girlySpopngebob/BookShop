import express, { response } from 'express'
import {PORT,MongoDBURL} from './config.js'
import  { MongoClient, ServerApiVersion } from "mongodb"
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
  return  res.status(200).send("<h1>Hello Nigger</h1>")})

app.get('/shop', (req, res) => {
   return res.status(200).send("<h1>Shop</h1>")
})
app.get('/shop/:id', (req, res) => {
    const data = req.params 
    return res.status(200).send(`<h1> Book: ${data.id}</h1>`)
})

app.post('/savebook',(req, res) => {
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