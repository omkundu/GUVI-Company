const express = require("express");

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
    res.send("Try loggin in, already exist");
  } else {
    try {
      const user = new VenderModel({ email, password, name });
      await user.save();
      res.send("Sign up successfull");
    } catch (err) {
      console.log(err);
      res.send("Something went wrong, pls try again later");
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await VenderModel.find({ email });

    if (user) {
      res.status(201).send({ msg: "Login successfull" });
    } else {
      res.send("Login failed");
    }
  } catch {
    res.send("Something went wrong, please try again later");
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log(`Listening on PORT ${process.env.PORT}`);
});
