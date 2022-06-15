const jwt = require("jsonwebtoken");
const authentication= function(req, res, next){

    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    if (!token) return res.send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });

    next()
}

const authorization= function(req, res, next){
    
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");
    
    let userToBeModified = req.params.userId
    let userLoggedIn = decodedToken.userId

    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

    next()
}
module.exports={authentication, authorization}