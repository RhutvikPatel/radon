const { model } = require("mongoose")
const ProductModel = require("../models/productModel")

const createProduct = async function(req, res){
    let data = req.body
    if(!data.price) return res.send({msg:"Price is mandatory"})
    let product = await ProductModel.create(data)   
    res.send({data : product})
}

module.exports.createProduct= createProduct