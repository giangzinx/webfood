const express = require("express");

const {
  getindex,
  postCheckCustomer,
  postCreateCustomer,
} = require("../controllers/homeController");

const router = express.Router();

router.get("/", getindex);

router.get("/index", getindex);

router.post("/check-customer", postCheckCustomer);

router.post("/create-customer", postCreateCustomer);
module.exports = router;
