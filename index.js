require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const checkAuth = require('./middleware/verifyAuth');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let secret;
if (process.env.NODE_ENV === 'test') {
  secret = 'test';
} else {
  secret = process.env.JWT_SECRET_KEY;
}

const countries = [];

app.get('/', (req,res) => {
  res.status(200).send('WELCOME TRAVELLER');
});

const savedUserName = 'admin';
const savedPassword = 'admin';

app.post('/login',(req,res) => {
  const { username, password } = req.body;
  const data = {
    user: username,
    pass: password
  };
  if(username === savedUserName && password === savedPassword){
    jwt.sign({data}, secret, {expiresIn: '24h'}, (err,token) => {
      res.status(200).json({
        status: 'Successful',
        message: 'Authentication Successful',
        user: {
          token,
        }
      });
    });
  } else {
    res.status(401).json({
      status: 'Failed',
      message: 'Authentication failed'
    });
  }
});

app.get('/countries', checkAuth, (req, res) => {
  arrayLength = countries.length;
  if(arrayLength < '1') {
    res.status(404).json({
      message: 'Empty Array',
    });
  } else {
    res.status(200).json({
      status: 'Successful',
      countries,
    });
  }
});

app.put('/countries', checkAuth, (req, res) => {
   const { country } = req.body;
   if(country !== ''){
    countries.push(country);
    res.status(200).json({
      newCountry : country,
    });
   } else {
     res.status(401).json({
       status: 'failed',
       message: 'Empty field',
     });
   }
   
});

app.delete('/countries', checkAuth, (req, res) => {
  const { country } = req.body;
  const check = countries.includes(country);
  if(check){
    countries.pop(country);
    res.status(200).json({
      status: 'Successful',
      countries,
    });
  } else {
    res.status(404).json({
      message: 'country not found',
    });
  }
  
});


const port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log(`you are live on 127.0.0.1:${port}`);
});