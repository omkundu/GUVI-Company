const mongoose = require("mongoose");

const venderSchema = mongoose.Schema({
  email: String,
  require: true,
  unique: true,
  password: String,
  require: true,
  name: String,
  age: String,
  dob: String,
  mobile: string,
  gender: string,
});

const VenderModel = mongoose.model("vender", venderSchema);

module.exports = {
  VenderModel,
};
