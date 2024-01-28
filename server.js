const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 10000
const cors = require('cors');
const e = require('express');
app.use (cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')

const dotenv = require('dotenv').config()
const uri = process.env.MONGOLAB_URI

MongoClient.connect(uri)
    .then(client => {
        console.log('Connected to userlogs')
        const userListDB = client.db('UserList')
        //const userlist = userListDB.collection('Users')
        const userLogsDB = client.db('UserLogs')
       // const loggedInUser = userLogsDB.collection('userToBeSpecified')//this is where we set the users specific log using their user name. this will keep all of their observations in their own collection. UserToBeSpecified should not contain any resources

        app.get('/', (req,res)=> {
            res.sendFile(__dirname + '/index.html')
        })
/////////////////////////////////////////////////////////////////////////////////////////////////////////
 
        app.post('/api/set_new_user', (req,res) =>{
            const {username, password} = req.body
            const newUser = req.body
            userListDB.collection('Users')
                .findOne({username: username})
                .then(user =>{
                    if(user){
                        res.render('username_exists.ejs')
                    }else if(username.length < 3){
                        res.render('username_exists.ejs')
                    }else if(password.length < 8){
                        res.render('fix_your_password.ejs')
                    }else{
                        userListDB.collection('Users')
                        .insertOne(newUser)
                        
                        .then(result => {
                            res.render('first_time_user_landing_page.ejs', {currentUser: username })//need to map thing out from here and create this file
                        })
                    }
                })
               
        })

        app.post('/api/findusername', (req,res) =>{
            const {usernameExisting, passwordExisting} = req.body
            userListDB.collection('Users')
                .findOne({username: usernameExisting, password: passwordExisting})
                .then(user => {
                    if(user){
                        /////
                        userLogsDB.collection(usernameExisting)
                        .find()
                        .toArray()
                        .then(results => {
                            const uniqueCategories = [...new Set(results.map(obj => obj.category))]
                            const clientArray = JSON.stringify(uniqueCategories); 
                            console.log(uniqueCategories)
                                res.render('user_landing_page.ejs', {clientArray, currentUser: usernameExisting})
                            })
                        
                        /////
                            // res.render('user_landing_page.ejs', {currentUser: usernameExisting})
                    }else{
                        res.render('incorrect_credentials.ejs')
                    }                   
                })
               
       })
  /////////////////////////////////////////////////////////////////////////////////////////////
        app.post('/api/new_entry', (req,res)=> {
            const Time = new Date();
            const dateTime = Time.toLocaleString()
            //const uniqueCategories = JSON.parse(req.body.uniqueCategories)//this is unnecessary code because we find the array of categories again when we click to make another new entry. 
            let {entry_title, category, observations} = req.body;
            const currentUser = req.body.currentUser;
            if(Array.isArray(category)){
                category = category.filter(x => x.length > 0)[0]
            };
            console.log(category)
            if(entry_title == '' || observations == '' || category == '' || category === undefined){
                return res.status(404).send('Please fill out all fields')
            };
            const newEntry = {
                dateTime,
                entry_title,
                category,
                observations
            };
            userLogsDB.collection(currentUser)
                .insertOne(newEntry)
                .then(result =>{
                    console.log(result)
                    console.log(dateTime)
                    console.log(category)
                    res.render('entry_made.ejs', {currentUser: currentUser})
                })
                .catch(error => console.error(error))          
        })
        ///////
        app.post('/api/another_new_entry', (req, res) => {
            const currentUser = req.body.currentUser
            userLogsDB.collection(currentUser)
                        .find()
                        .toArray()
                        .then(results => {
                            const uniqueCategories = [...new Set(results.map(obj => obj.category))]
                            const clientArray = JSON.stringify(uniqueCategories); 
                            console.log(uniqueCategories)
                            res.render('user_landing_page.ejs', {clientArray, currentUser: currentUser})
                            })
        })
        ///////
        app.post('/api/journal', (req,res) =>{
            const currentUser = req.body.currentUser;
            userLogsDB.collection(currentUser)
                .find()
                .toArray()
                .then(results => {
                    res.render('user_journal.ejs', {entries: results, currentUser: currentUser})
                })
                .catch(error => console.error(error))
        })
/////////////////////////////////////////////////////////////////////////////////////////
        app.delete('/api/remove_observation', (req, res) =>{
            const currentUser = req.body.currentUser
            const entryToRemove = req.body.dateTime
            console.log(currentUser)
            console.log(entryToRemove)
            userLogsDB.collection(currentUser)
                .findOneAndDelete({dateTime: entryToRemove})
                .then(result =>{
                    if(result){
                        console.log('observation deleted:', result)
                    }else {console.log('no observation found')
                            console.log({dateTime: entryToRemove})}
                    userLogsDB.collection(currentUser)
                        .find()
                        .toArray()
                        .then(results => {
                                res.render('user_journal.ejs', {entries: results, currentUser: currentUser})
                            })
                        .catch(error => console.error(error))
                })
                .catch(error=> { console.error(error)})
         
        })
/////////////////////////////////////////////////////////////////////////////////////////
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch(error => console.error(error))