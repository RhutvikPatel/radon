const jwt = require("jsonwebtoken");

const authentication = function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    if (!token)
      return res.status(401).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken)
      return res.status(401).send({ status: false, msg: "token is invalid" });

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const authorization = function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");

    let userToBeModified = req.params.userId;
    let userLoggedIn = decodedToken.userId;

    if (userToBeModified != userLoggedIn)
      return res.status(403).send({ msg: "User logged is not allowed to modify the requested users data" });

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { authentication, authorization };