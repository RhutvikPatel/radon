const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const ProductController= require("../controllers/productController")
const commonMW = require ("../middlewares/commonMiddlewares");
const UserController = require("../controllers/userController")
const OrderController = require("../controllers/orderController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


// router.get("/getUsersData", UserController.getUsersData)

// const mid1= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid1")
//     // logic
//     let loggedIn = false

//     if (loggedIn== true) { 
//         console.log( "OK LOGGED IS IS TRUE NOW")
//         next ()
//     }
//     else {
//         res.send ("Please login or register")
//     }
// }

// // e.g. restricted and open-to-all API's can be handled like below now:
// router.get('/homePage', mid1, UserController.feeds)
// router.get('/profileDetails', mid1, UserController.profileDetails)
// router.get('/friendList', mid1, UserController.friendList)
// router.get('/changePassword', mid1, UserController.changePassword)

// router.get('/termsAndConditions',  UserController.termsAndConditions)
// router.get('/register',  UserController.register)

router.post("/createProduct", ProductController.createProduct)

router.post("/createUser", commonMW.mid, UserController.createUser)

router.post("/createOrder", commonMW.mid, commonMW.checkUserAndProductId, OrderController.createOrder)



module.exports = router;