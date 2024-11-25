const express = require("express");

const {
  getindex,
  gethome,
  getAdmin,
  getAdminOrder,
  getAdminFood,
  getAdminShipper,
  getorder,
  getshipper,
  postCheckCustomer,
  postCreateCustomer,
  postUpdateCustomer,
  postDeleteCustomer,
  postCreateShipper,
  postUpdateShipper,
  postDeleteShipper,
  postUpdateFood,
  postCreateOrder,
  postAcceptOrder,
  postCompleteOrder,
  postCancelOrder,
} = require("../controllers/homeController");

const router = express.Router();

router.get("/", getindex);

router.get("/index", getindex);

router.get("/home/:id", gethome);

router.get("/admin", getAdmin);

router.get("/admin-order", getAdminOrder);

router.get("/admin-food", getAdminFood);

router.get("/admin-shipper", getAdminShipper);

router.get("/order/:customer_id/:food_id", getorder);

router.get("/shipper/:id", getshipper);

router.post("/check-customer", postCheckCustomer);

router.post("/create-customer", postCreateCustomer);

router.post("/update-customer/:id", postUpdateCustomer);

router.post("/delete-customer/:id", postDeleteCustomer);

router.post("/create-shipper", postCreateShipper);

router.post("/update-shipper/:id", postUpdateShipper);

router.post("/delete-shipper/:id", postDeleteShipper);

router.post("/update-food/:id", postUpdateFood);

router.post("/create-order", postCreateOrder);

router.post("/accept-order", postAcceptOrder);

router.post("/complete-order", postCompleteOrder);

router.post("/cancel-order", postCancelOrder);

module.exports = router;
