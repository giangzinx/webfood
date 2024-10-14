const express = require("express");
const {
  getindex,
  getlogin,
  getintro,
  getsignin,
  getsupport,
  getpayment,
  getResults,
  getmisspassword,
  getsearch,
  gethome,
  getadmin,
  getUpdateUser,
  getUpdateProduct,
  postCreateUser,
  postCheckUser,
  postUpdateUser,
  postDeleteUser,
  postCreateProduct,
  postUpdateProduct,
  postDeleteProduct,
  postSearchProduct,
} = require("../controllers/homeController");
const router = express.Router();

router.get("/", getindex);

router.get("/index", getindex);

router.get("/login", getlogin);

router.get("/signin", getsignin);

router.get("/support/:id", getsupport);

router.get("/payment", getpayment);

router.get("/intro", getintro);

router.get("/results/:id", getResults);

router.get("/home/:id", gethome);

router.get("/admin", getadmin);

router.get("/UpdateUser/:id", getUpdateUser);

router.get("/UpdateProduct/:id", getUpdateProduct);

router.post("/create-user", postCreateUser);

router.post("/update-user", postUpdateUser);

router.post("/delete-user/:id", postDeleteUser);

router.post("/check-user", postCheckUser);

router.post("/create-product", postCreateProduct);

router.post("/update-product", postUpdateProduct);

router.post("/delete-product/:id", postDeleteProduct);

router.post("/search", postSearchProduct);

module.exports = router;
