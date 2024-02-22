require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model");

app.use(express.json());

const port = process.env.PORT || 4800;

app.get("/test", async (req, res) => {
  res.json({ message: "working" });
});

const url =
  "mongodb+srv://ecommerce:euxp7tjnWs1yAQvs@cluster0.iwpzd4g.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect("mongodb+srv://ecommerce:euxp7tjnWs1yAQvs@cluster0.iwpzd4g.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("db contacted");
  })
  .catch(() => {
    console.log("failed to create");
  });

app.get("/", async function (req, res) {
  try {
    const user = await User.find({});
    if (!user) {
      return res.json({ message: "user not found" });
    }
    return res.json({ user: user });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.post("/", async function (req, res) {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      return res.json({ message: "failed to created" });
    }
    return res.json({ message: "user cerated", user: user });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.patch("/:id", async function (req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { username: req.body.username }
    );
    return res.json({ message: "update successfully" });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.delete("/:id", async function (req, res) {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    res.json({ message: "user deleted" });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Server is on ${port}`);
});
