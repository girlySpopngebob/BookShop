import express from 'express'
const app = express()

const PORT = 3000

app.use (express.json())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.status(200).send("<h1>Hello Nigger</h1>")})

app.get('/shop', (req, res) => {
    res.status(200).send("<h1>Shop</h1>")
})
app.get('/shop/:id', (req, res) => {
    const data = req.params 
    res.status(200).send(`<h1> Book: ${data.id}</h1>`)
})