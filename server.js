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

// this is how we can pull info from the api that is hard coded. probably not useful in this instance but it i am still experimenting with all of this and this was a useful way to test that the server was live on cyclic
// app.get('/api/:poop', (request, response) => {
//     const userName = request.params.poop.toLowerCase()
//     if(users[userName]){
//         response.json(users[userName])
//     }
    // else{
        // response.json(rappers['unknown'])
    // }
//})

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