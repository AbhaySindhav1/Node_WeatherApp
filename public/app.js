const hbs = require("hbs");
const express = require("express");
const app = express();
const path = require("path");
const forecast = require("./weatherFunction/forecast");
const geocast = require("./weatherFunction/geocast");

const pathh = path.join(__dirname, "../staticServing");
const templetePath = path.join(__dirname, "../templete/views");
const partialsPath = path.join(__dirname, "../templete/partials");

app.set("view engine", "hbs");
app.set("views", templetePath);

hbs.registerPartials(partialsPath);

app.use(express.static(pathh));

app.get("", (req, res) => {
  res.render("index", {
    name: "Abhay sindhav",
    title: "Weather page",
    createdfor: "Weather page created by @Abhay sindhav",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    createdfor: "about page",
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "error 404 ",
    errorMessage: "article not found",
    createdfor: " sorry you are finding incorrct article ",
  });
});

app.get("/help", (req, res) => {
  res.send({
    name: "abhay",
    age: 22,
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "provide search please",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please Provide Right Location",
    });
  } else {
    // console.log("no have to here")

    geocast(req.query.search, (error, { lat, long, loc } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(lat, long, (error, data) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: data,
          location: loc,
          address: req.query.search,
        });
      });
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "error 404 ",
    errorMessage: "page not found",
    createdfor: " you are entering incorrect ",
  });
});

app.listen(8000, () => {
  console.log("ExpressJS is Listening at PORT : 8000");
});
