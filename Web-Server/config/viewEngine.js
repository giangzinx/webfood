const path = require("path");
const express = require("express");

const configViewEngine = (app) => {
  console.log(">>> Check : ", path.join("../Web-Server", "views"));
  app.set("views", path.join("../Web-Server", "views"));
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  //Config static files:
  app.use(express.static(path.join("../Web-Server", "public")));
};

module.exports = configViewEngine;
