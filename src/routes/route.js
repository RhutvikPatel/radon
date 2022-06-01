const express = require("express");
const externalModule = require("../logger/logger");
const externalModule1 = require("../util/helper");
const externalModule2 = require("../validator/formatter");

const router = express.Router();

router.get("/test-me", function (req, res) {
  externalModule.greet();
  externalModule1.date();
  externalModule1.month();
  externalModule1.batchInfo();
  externalModule2.trimText();
  externalModule2.lowerCase();
  externalModule2.upperCase();
  res.send("My first ever api!");
});
module.exports = router;
// adding this comment for no reason
