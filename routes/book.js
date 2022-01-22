const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

router.get('/all', async(req, res) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        data: books,
        count: books.length
    })
})

router.post('/add', async(req, res) => {
    
    const newBook = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        faculty: req.body.faculty
    }

    newBook.save((err, result) => {
        if (err) res.err(err.message);
        else return res.send(result);
    })
})

module.exports = router;