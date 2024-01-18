const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')

//ZSJgIL8KWdrKJAlN

//This is just my tester API
// let users = {
//     'mathias' : {
//         'logs' : {
//             'date_time' :{
//                 'test': 'tester',
//             }
//         },
//     },
// }


MongoClient.connect('mongodb+srv://Mathias:ZSJgIL8KWdrKJAlN@userlogs.i3ktgqg.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected to userlogs')
        const userListDB = client.db('UserList')
        const userlist = userListDB.collection('Users')
        const userLogsDB = client.db('UserLogs')
        const loggedInUser = userLogsDB.collection(`mathias`)//this is where we set the users specific log using their user name. this will keep all of their observations in their own collection. the two areas that mathias are should be filled with with a template literal pointing at the users username.

        app.get('/', (req,res)=> {
            res.sendFile(__dirname + '/index.html')
        })
/////////////////////////////////////////////////////////////////////////////////////////////////////////

        //I am using this to look through the list of usernames. currently it just logs the contents of the database. i will have to do more work to make this useful
        app.post('/api/set_new_user', (req,res) =>{
            const newUser = req.body
            userListDB.collection('Users')
                .insertOne(newUser)
                .then(result => {
                    console.log(result)
                    res.sendFile(__dirname + '/index.html')
                })
        })

        app.post('/api/findusername', (req,res) =>{
            const {usernameExisting, passwordExisting} = req.body
            console.log(usernameExisting)
            userListDB.collection('Users')
                .findOne({username: usernameExisting, password: passwordExisting})
                .then(user => {
                    if(user){
                        res.send('User Authenticated')
                        console.log(user)
                    }else{
                        res.send('there is no match for these credentials')
                        console.log(user)
                    } 
                   
                })

       })
        //
        // app.post('/api/new_user', (res,res)=>{
        //     const newEntryDateTime = new Date();
        //     const {username, password} = req.body;
        //     if(username.length < 5 || password.length < 8){
        //         return res.status(404).send('Please be sure to use a username at least five characters long and a password at least eight characters long')
        //     }
        //     //else if(
        //     //     app.get('/api/userlist', (req,res)=>{
        //     //         ul.collection('Users')
        //     //         .find()
        //     //         .toArray()
        //     //         .then(results =>{
        //     //             console.log
        //     //         })
        //     //     })
        //     // ){}
        // })
        app.post('/api/new_entry', (req,res)=> {
            const newEntryDateTime = new Date();
            const {entry_title, log} = req.body;
            if(entry_title == '' || log == ''){
                return res.status(404).send('Please fill out the title and observations fields')
            };
            const newEntry = {
                newEntryDateTime,
                entry_title,
                log
            };
            mathias
                .insertOne(newEntry)
                .then(result =>{
                    console.log(result)
                    res.sendFile(__dirname + '/entryComplete.html')
                })
                .catch(error => console.error(error))          
        })
/////////////////////////////////////////////////////////////////////////////////////////
        app.listen(process.env.PORT || PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })

    })
    .catch(error => console.error(error))








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

 // const {entry_title, log} = req.body
            // const newEntryDateTime = Date()
            // if (!entry_title || !log){
            //     return res.status(400).send('Both entry name and entry body are required')
            // }
            // users['mathias'].logs[newEntryDateTime] = {[entry_title]: log};
            // console.log(users)