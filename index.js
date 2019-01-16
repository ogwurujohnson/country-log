require('dotenv').config();
const express = require('express');
const bodyParser = require(body-parser);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
  res.status(200).send('welcome traveller');
});

const userName = 'admin';
const password = 'admin';

app.post('/login',(req,res) => {
  const { user, pass } = req.body;
  res.send(`welcome ${submittedUsername}`);
});


const port = 3000 || process.env.PORT;

app.listen(port,()=>{
  console.log(`you are live on 127.0.0.1:${port}`);
});