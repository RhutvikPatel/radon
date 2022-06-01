const trim = function () {
  const text = "     functionUp -> Radon Batch   ";
  console.log(text.trim());
};

const changetoLowerCase = function () {
  const text = "hello How aRe YOU !!!";
  console.log("lowerCase: " + text.toLowerCase());
};

const changeToUpperCase = function () {
  const text = "Its niCE to meeT yoU";
  console.log("upperCase: " + text.toUpperCase());
};

module.exports.trimText = trim;
module.exports.lowerCase = changetoLowerCase;
module.exports.upperCase = changeToUpperCase;
