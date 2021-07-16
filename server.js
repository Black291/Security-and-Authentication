const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth')

const {User} = require('./models/user');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post('/api/user',(req,res)=>{

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err,doc)=>{
        if(err) res.status(400).send(err)
        res.status(200).send(doc)
    })
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
})