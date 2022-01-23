const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


// routes
const bookRouter = require('./routes/book')
const userRouter = require('./routes/user')


// for post request
app.use(express.json())

// environment variables config
dotenv.config({
    path: './config/config.env'
})


// cors
app.use(cors());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

mongoose.connect(process.env.MONGODB_URI)
    .then((res) => console.log('Connected to the database...'))
    .catch(err => console.log(err.message))

app.use('/book', bookRouter);



app.get('/', (req, res) => {
    res.send('hello world');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server listening at port ${PORT}`))