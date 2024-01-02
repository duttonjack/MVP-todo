import express from 'express'
import pg from 'pg'

const { Pool } = pg
const pool = new Pool ({
    user: 'duttonjack',
    host: 'localhost',
    database: 'todolist',
    port: 5432
})
const app = express()
const expressPort = 8005;

app.use(express.json())
app.use(express.static('public'))

app.get('/list', (req, res) => {
    console.log("made it in app.get /list")
    pool.query('SELECT * FROM list;')
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        console.error(error)
        res.status(500).send("Internal Server Error")
    })
})

app.listen(expressPort, () => {
    console.log(`Server listening at port ${expressPort}`)
})