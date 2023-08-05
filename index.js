const express = require("express");
const app=express()
const cors = require("cors");
const { connection } = require("./config/db");
const { VenderModel } = require("./models/Vender.model");

require("dotenv").config();



app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password, name } = req.body;
  const userPresent = await VenderModel.findOne({ email });
  if (userPresent?.email) {
    return res.status(409).json({ error: 'Email already exists.' });
  } else {
    try {
      const user = new VenderModel({ email, password, name });
      await user.save();
     return  res.status(200).send("Sign up successfull");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong, pls try again later");
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await VenderModel.find({ email });

    if (user) {
   return   res.status(200).send({ msg: "Login successfull" });
    } else {
    return  res.status(201).send("Login failed");
    }
  } catch {
   return res.status(500).send("Something went wrong, please try with correct creditials");
  }
});

connection()
.then(data=>{
  app.listen(process.env.PORT, async () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
  });
})
.catch(err=>{
  console.log(err)
})



