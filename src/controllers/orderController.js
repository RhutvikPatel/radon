const OrderModel = require("../models/orderModel")
const UserModel =require("../models/userModel")
const ProductModel = require("../models/productModel")

const createOrder= async function(req, res){
    let headerData= req.headers.isfreeappuser
    let data = req.body
    if(headerData===true){
        let orderData= await OrderModel.create(data)
        let outPut= await OrderModel.findOneAndUpdate({data},{$set:{amount:0}},{new:true})
        return res.send({msg : outPut})
    }
    // else{

    //     let priceOfProduct= await ProductModel.findById({_id:req.body.productId}).select({price:1})
    //     if(req.body.productId.price<=req.body.amount)return res.send({msg:"Not enough balance..."})
    //     let updatedUser = await UserModel.updateOne({_id:req.body.userId}, [{$inc:{"req.body.userId.balance":priceOfProduct}},{isFreeAppUser:headerData}],{new:true})
    //     let orderData= await OrderModel.create(data)
    //     return res.send({data : orderData})
    // }
    res.send("check")
}

module.exports.createOrder= createOrder