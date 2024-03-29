import express from 'express'
import pg from 'pg'
import 'dotenv/config'


// Pool setup for postgres
const { Pool } = pg
const connectionString = process.env.DATABASE_URL
const pool = new Pool ({
    connectionString,
})

// Server Initilization
const app = express()
const expressPort = 8004;

// Server Middlewares
app.use(express.json())
app.use(express.static('public'))


// Route Handlers
// Generic Get Handler
app.get('/api/list', (req, res) => {
    pool.query('SELECT * FROM list ORDER BY listid;')
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        console.error(error)
        res.status(500).send("Internal Server Error")
    })
})

// Post Handler
app.post('/api/list', (req, res) => {
    console.log("made it into server Post route")
    const inputText = req.body.text
    console.log(inputText)
    pool.query('INSERT INTO list (descr) VALUES ($1)', [ inputText ])
    .then((result) => {
        res.status(200).json("success")
    })
    .catch((error) => {
        res.status(500).json("Post Server Error")
    })
})


// Patch Handler
app.patch('/api/list/:listId', (req, res) => {
    const listId = req.params.listId
    const status = req.body.completed
    pool.query('UPDATE list SET completed = $2 WHERE listid = $1', [ listId, status ])
        .then((result) => res.status(200).json('Update successful'))
        .catch((error) => res.status(500).json('Patch Server Error'))
})


// Delete by id Handler
app.delete('/api/list/:listId', (req, res) => {
    const listId = req.params.listId
    pool.query('DELETE FROM list where listid = $1', [ listId ])
        .then((result) => res.status(200).json("Deleted entry"))
        .catch((error) => res.status(500).json("Server error - failed to delete dntry"))
})


// Server listener
app.listen(expressPort, () => {
    console.log(`Server listening at port ${expressPort}`)
})