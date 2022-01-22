const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
})

app.get('/user2', (req, res) => {
    res.send('hello world 2');
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server listening at port ${PORT}`))