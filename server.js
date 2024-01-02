import express from 'express'
import pg from 'pg'
import 'dotenv/config'



const { Pool } = pg
// const pool = new Pool ({
//     user: 'duttonjack',
//     host: 'localhost',
//     database: 'todolist',
//     port: 5432
// })

const connectionString = process.env.DATABASE_URL
const pool = new Pool ({
    connectionString,
})

const app = express()
const expressPort = 8004;

app.use(express.json())
app.use(express.static('public'))

app.get('/list', (req, res) => {
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