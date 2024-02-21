const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 8500;

app.get("/", async function (req, res) {
  await res.render("home");
});

app.get("/about", async function (req, res) {});
app.get("/contact", async function (req, res) {});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Server is on ${port}`);
});
