import express from 'express'

const app = express()
const expressPort = 8005;

app.use(express.json())
app.use(express.static('public'))


app.listen(expressPort, () => {
    console.log(`Server listening at port ${expressPort}`)
})