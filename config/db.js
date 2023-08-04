const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
// const connection = mongoose.connect(process.env.mongo_url);
const connection=async()=>{
  try {
    const conn=await mongoose.connect(process.env.mongo_url)
    console.log("Connected to database")
  } catch (err) {
      console.log(err)
      process.exit(1)
  }
}
module.exports = { connection };
