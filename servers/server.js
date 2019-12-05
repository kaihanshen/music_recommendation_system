const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");


var app = express();
app.use(bodyParser.json());
app.use(cors());


var mysqlConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'mydb',
    multipleStatements : true 
});


mysqlConnection.connect((err) => {
    if (!err){
        console.log("Connected!");
    }else{
        console.log("Connection Failed!");
    }
})

app.listen(8000, ()=>console.log('Express server is running on port: 8000'));

let users = [{ id: 1, firstName: 'Jason', lastName: 'Watmore', username: 'test', password: 'test' }];

//Service for Basic Component
app.get('/music', (req,res)=>{
    mysqlConnection.query('SELECT * FROM api_music', (err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
})

app.get('/music/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM api_music WHERE id = ?',[req.params.id], (err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
})

app.get('/singer/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM api_music JOIN singer ON api_music.title=singer.songName WHERE id = ?',[req.params.id], (err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
})

app.post('/music/search', (req,res)=>{
    mysqlConnection.query('SELECT * FROM api_music WHERE title = ?',[req.body.title], (err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
})

app.delete('/music/:id', (req,res)=>{
    mysqlConnection.query('DELETE FROM api_music WHERE id = ?',[req.params.id], (err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
})

app.post('/music', (req,res)=>{
    mysqlConnection.query('INSERT INTO api_music SET ?',[req.body], (err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
})

app.put('/music/:id', (req,res)=>{
    mysqlConnection.query('UPDATE api_music SET ? WHERE id = ?', [req.body, req.params.id], (err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
})



//Service for Authentication
app.post('/authenticate', (req,res)=>{
    mysqlConnection.query('SELECT * FROM user_auth WHERE username = ? AND password = ?',[req.body.username, req.body.password], (err, rows, fields)=>{
        if (rows.length>0)
        // console.log(rows[0].firstname);
        res.send(rows);
        else
        // alert('Username and password do not match');
        res.send('Username and password do not match.');
    })
    
})



//Service for Users
app.post('/user', (req,res)=>{
    mysqlConnection.query('INSERT INTO user_auth SET ?',[req.body], (err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
})


//Service for Moods
app.post('/mood', (req,res)=>{
    mysqlConnection.query('INSERT INTO user_mood SET ?',[req.body], (err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
})

app.get('/mood1/:name', (req,res)=>{
    let username = req.params.name;
    var sql = 'SET @userName = ?; CALL mood_procedure(@userName);';
    mysqlConnection.query(sql, [username], (err, rows, fields)=>{
        console.log(username);
        if (!err)
        rows.forEach(element => {
            if (element.constructor == Array)
            res.send(element);
        });
        // if(!err)
        // res.send(rows);
        else
        console.log(err);
    })
})

app.get('/mood/:name', (req,res)=>{
    mysqlConnection.query('SELECT SUM(party) as p, SUM(romance) as r,SUM(focus) as fo,SUM(throwback) as t,SUM(fitness) as fi,SUM(sleep) as s,SUM(chill) as c,SUM(blue) as b,SUM(frustrated) as fr,SUM(depressed) as d FROM user_mood GROUP BY username HAVING username = ?', [req.params.name], (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})




// MongoDB
mongoose.connect('mongodb://localhost/friendsDB', {useNewUrlParser: true}, (err) => {
    if (!err)   {console.log('MongoDB succussfully connected!')}
    else {console.log('Error in connecting mongoDB')}
});

var friendsSchema = new mongoose.Schema({
    username: String,
    favourite_music: Array,
    favourite_singers: Array,
    friends_list: Array
  });

var Friends = mongoose.model('Friends', friendsSchema);

app.get('/friend/', (req, res) => {
    Friends.find((err, docs) => {
        if (!err){
            res.send(docs);
        }else{
            console.log(err);
        }
    })
})

app.get('/friend/:name', (req,res) => {
    var username = req.params.name;
    Friends.find({username: username}, (err, docs) => {
        if (!err){
            res.send(docs);
        }else{
            console.log(err);
        }
    })
})