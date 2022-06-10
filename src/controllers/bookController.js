const AuthorModel = require("../models/authorModel")
const BookModel= require("../models/bookModel")
const PublisherModel= require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    if(req.body.author=="" && req.body.publisher=="") return res.send({msg: "AuthorId and PublisherId is required "})
    
    let authorId=req.body.author
    let publisherId=req.body.publisher
    
    let authorList= await AuthorModel.findById({_id:authorId})
    let publisherList= await PublisherModel.findById({_id:publisherId})

    if(!authorList)return res.send({msg: "Author Id is not found"})
    if(!publisherList)return res.send({msg: "Publisher Id is not found"})

    let bookCreated = await BookModel.create(book)
    res.send({data: bookCreated})
}



const getBooksWithAuthorAndPublisherDetails = async function (req, res) {
    let specificBook = await BookModel.find().populate(['author','publisher'])
    res.send({data: specificBook})

}

const updateIsHardCover= async function (req, res) {
    let bookList= await BookModel.updateMany({},{isHardCover:false})
    res.send({msg: bookList})
}

const bookPublishedByPenguinAndHarperCollins = async function (req, res) {
    let publisherId = await PublisherModel.find({name:{$in:["Penguin", "HarperCollins"]}}).select({_id:1})
    let updateBook = await BookModel.updateMany({publisher: publisherId},{$set:{isHardCover:true}},{new:true})
    
    res.send({data: updateBook})
}

const booksByAuthorRating = async function(req, res) {
    let authorDetail= await AuthorModel.find({rating:{$gt:3.5}})
    let updatePrice = await BookModel.updateMany({author: authorDetail},{$inc: {price:10}},{new:true})

    res.send({data: updatePrice})
}

module.exports={createBook, getBooksWithAuthorAndPublisherDetails, updateIsHardCover,  booksByAuthorRating, bookPublishedByPenguinAndHarperCollins}