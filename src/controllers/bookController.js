const BookModel= require("../models/bookModel")
const AuthorModel=require("../models/authorModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksByAuthorCB= async function(req, res){
    let authorData = await AuthorModel.find({author_name:"Chetan Bhagat"}).select("author_id")
    let bookList = await BookModel.find({author_id:authorData[0].author_id})
    res.send({msg: bookList})
}

const authorOfBook= async function(req, res){
    let bookData= await BookModel.findOneAndUpdate({name:"Two states"},{$set:{price:100}},{new:true})
    let authorData= await AuthorModel.find({author_id:bookData.author_id}).select({author_name:1, _id:0})
    let price= bookData.price
    res.send({msg: authorData, price})
}

const booksOfAuthorBetween50_100= async function(req, res){
    let bookData = await BookModel.find({price:{$gte:50, $lte:100}}).select({name:1, author_id:1,price:1, _id:0 })
    let authorData=[]
    for(let i=0;i<bookData.length;i++){
        authorData[i]=await AuthorModel.find({author_id:bookData[i].author_id}).select({author_name:1, author_id:1, _id:0})
    } 
    res.send({bookData,authorData})
}

module.exports= {createBook, getBooksByAuthorCB, booksOfAuthorBetween50_100, authorOfBook}