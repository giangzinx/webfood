const express = require("express");

const {
  getindex,
  gethome,
  getAdmin,
  getAdminOrder,
  getAdminFood,
  getorder,
  postCheckCustomer,
  postCreateCustomer,
  postUpdateCustomer,
  postDeleteCustomer,
  postUpdateFood,
} = require("../controllers/homeController");

const router = express.Router();

router.get("/", getindex);

router.get("/index", getindex);

router.get("/home/:id", gethome);

router.get("/admin", getAdmin);

router.get("/admin-order", getAdminOrder);

router.get("/admin-food", getAdminFood);

router.get("/order/:customer_id/:food_id", getorder);

router.post("/check-customer", postCheckCustomer);

router.post("/create-customer", postCreateCustomer);

router.post("/update-customer/:id", postUpdateCustomer);

router.post("/delete-customer/:id", postDeleteCustomer);

router.post("/update-food/:id", postUpdateFood);

module.exports = router;
