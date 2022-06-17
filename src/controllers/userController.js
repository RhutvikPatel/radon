const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await userModel.create(data);
    console.log(req.newAtribute);
    res.status(201).send({ msg: savedData });
  } catch (error) { 
    res.status(500).send(error.message);
  }
};

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({emailId: userName, password: password});
    if (!user)
      return res.status(400).send({ msg: "username or the password is not corerct" });

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "thorium",
        organisation: "FunctionUp",
      },
      "functionup-radon"
    );
    res.setHeader("x-auth-token", token);
    res.status(200).send({ token: token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(404).send({ msg: "No such user exists" });

    res.send({ status: true, data: userDetails });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);

    if (!user) return res.status(404).send("No such user exists");

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      userData,
      { new: true }
    );
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let dUser = await userModel.findByIdAndUpdate({ _id: userId },{ $set: { isDeleted: true } },{ new: true });
    res.status(200).send({ data: dUser });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const postMessage = async function (req, res) {
  try {
    let posts = req.body.posts;

    let user = await userModel.findById(req.params.userId);

    if (!user)
      return res.status(404).send({ status: false, msg: "No such user exists" });

    let updatedPosts = user.posts;

    //add the message to user's posts
    updatedPosts.push(posts);
    let updatedUser = await userModel.findOneAndUpdate({ _id: user._id },{ posts: updatedPosts },{ new: true });

    //return the updated user document
    return res.status(200).send({ data: updatedUser });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage;