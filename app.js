const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const passport = require('passport');
// routes
const bookRouter = require('./routes/book')
const authRouter = require('./routes/auth');



// for post request
app.use(express.json())

// environment variables config
dotenv.config({
    path: './config/config.env'
})
// cors
app.use(cors());



// encrypting user id in cookie and sending it to the browser
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))


// passport setup
app.use(passport.initialize());
app.use(passport.session());

// passport config
require('./authentication/passport-setup')


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then((res) => console.log('Connected to the database...'))
    .catch(err => console.log(err.message))

// routes setup 
app.use('/book', bookRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
    res.send('hello world');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server listening at port ${PORT}`))