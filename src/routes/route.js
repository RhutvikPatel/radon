const express = require('express');
const router = express.Router();
const AuthorController= require("../controllers/authorController")
const BookController= require("../controllers/bookController");
const AuthorModel = require('../models/authorModel');
const BookModel = require('../models/bookModel');

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", AuthorController.createAuthor  )

router.post("/createBook", BookController.createBook  )

router.get("/getBooksByAuthorCB",BookController.getBooksByAuthorCB)

router.get("/authorOfBook",BookController.authorOfBook)

router.get("/booksOfAuthorBetween50_100",BookController.booksOfAuthorBetween50_100)

module.exports = router;