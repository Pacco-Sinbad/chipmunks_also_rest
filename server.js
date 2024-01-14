const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 8000
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/', (req,res)=> {
    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, ()=> {
    console.log(`listening on ${8000}`)
})