const UserModel =require("../models/userModel")
const ProductModel = require("../models/productModel")

const mid= function ( req, res, next) {
    let isFreeAppUserCheck= req.headers.isfreeappuser
    if(!isFreeAppUserCheck){ res.send({msg: "isFreeAppUser Is Mandatory Please Provide it in Header"})}
    next()
}

const checkUserAndProductId = async function ( req, res, next) {
    if(req.body.userId=="" ) return res.send({msg: "UserId is required "})
    if(req.body.productId=="")return res.send({msg: "ProductId is required "})

    let idUser = req.body.userId
    let idProduct = req.body.productId

    let userDetails = await UserModel.findById({_id:idUser})
    let productDetails= await ProductModel.findById({_id:idProduct})

    if(!userDetails) return res.send({msg: "UserId is incorrect. Please provid valid userId"})
    if(!productDetails) return res.send({msg: "ProductId is incorrect. Please provid valid productId"})

    next()
}


module.exports.mid= mid
module.exports.checkUserAndProductId= checkUserAndProductId
