const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 8000
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

let users = {
    'mathias' : {
        'logs' : {
            'date_time' :{
                'test': 'tester',
            }
            

        },
    },

}

app.get('/', (req,res)=> {
    res.sendFile(__dirname + '/index.html')
})

app.post('/api/users/mathias/new_entry', (req,res)=> {
    const {entry_title, log} = req.body
    const newEntryDateTime = Date()
    if (!entry_title || !log){
        return res.status(400).send('Both entry name and entry body are required')
    }
    users['mathias'].logs[newEntryDateTime] = {[entry_title]: log};
    console.log(users)

    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, ()=> {
    console.log(`listening on ${8000}`)
})