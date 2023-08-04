const mongoose = require("mongoose");

const venderSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: String,
  dob: String,
  mobile: String,
  gender: String
});


const VenderModel = mongoose.model("vender", venderSchema);

module.exports = {
  VenderModel,
};
