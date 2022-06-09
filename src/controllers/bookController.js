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
    let publishers = await PublisherModel.find({name:{$in:["Penguin", "HarperCollins"]}})
    // let books = await BookModel.find().populate('publisher')
    // let books = await BookModel.find().populate('publisher').find({"publisher.name":{$in:["Penguin", "HarperCollins"]}})
    let booklist
    for(let i in publishers){
        booklist= await BookModel.find({"publisher.name": publishers[i].name})
    }
    res.send({data: booklist})
}

const booksByAuthorRating = async function(req, res) {

}

module.exports={createBook, getBooksWithAuthorAndPublisherDetails, updateIsHardCover,  booksByAuthorRating, bookPublishedByPenguinAndHarperCollins}