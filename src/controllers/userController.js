const UserModel= require("../models/userModel")


const createUser= async function (req, res) {
    let data= req.body


    let headerValue = req.headers.isfreeappuser
    let userData= await UserModel.create(data)
    // let userList = await UserModel.find().sort()
    let userData2= await UserModel.updateMany({data},{$set:{isFreeAppUser:headerValue}},{new:true})

    res.send({data: userData})
}

module.exports.createUser= createUser

