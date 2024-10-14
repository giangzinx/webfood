const connection = require("../config/database");
const mysql = require("mysql2");
const { name } = require("ejs");
const {
  getAllProducts,
  getAllUsers,
  updateUserById,
  updateProductById,
} = require("../services/CRUDService");
var session = require("express-session");

const getindex = (req, res) => {
  res.render("index");
};

const getlogin = async (req, res) => {
  res.render("login");
};

const getintro = (req, res) => {
  res.render("intro");
};

const getsignin = (req, res) => {
  res.render("signin");
};
const getsupport = async (req, res) => {
  let user_id = req.params.id;
  if (user_id === "none") {
    res.render(`support`, { user_id: user_id });
  } else {
    let sql = "SELECT * FROM Users WHERE id = ?";
    const [rows] = await connection.query(sql, [user_id]);
    let user_name = rows[0].fullname;
    res.render(`support`, { user_id: user_id, user_name: user_name });
  }
};
const getpayment = (req, res) => {
  res.render("payment");
};
const getResults = async (req, res) => {
  let user_id = req.params.id;
  console.log(user_id);
  let sql = "SELECT * FROM Users WHERE id = ?";
  const [rows] = await connection.query(sql, [user_id]);
  let user_name = rows[0].fullname;
  res.render(`results/${user_id}`, { user_name: user_name, user_id: user_id });
};
const getmisspassword = (req, res) => {
  res.render("misspassword");
};
const gethome = async (req, res) => {
  let user_id = req.params.id;
  console.log(user_id);
  let sql = "SELECT * FROM Users WHERE id = ?";
  const [rows] = await connection.query(sql, [user_id]);
  let user_name = rows[0].fullname;
  res.render("home", { user_name: user_name, user_id: user_id });
};
const getsearch = (req, res) => {
  res.render("search");
};
const getadmin = async (req, res) => {
  let userId = 1;
  let Users = await getAllUsers();
  let Products = await getAllProducts();

  res.render("admin", {
    listUsers: Users,
    listProducts: Products,
    userId: userId,
  });
};
const getUpdateUser = async (req, res) => {
  const userId = req.params.id;
  let [results, fields] = await connection.query(
    "select * from Users where id = ?",
    [userId]
  );
  let user = results && results.length > 0 ? results[0] : {};
  console.log(">>> check res: ", results);
  res.render("UpdateUser", { userUpdate: user });
};
const getUpdateProduct = async (req, res) => {
  const productId = req.params.id;
  let [results, fields] = await connection.query(
    "select * from Products where id = ?",
    [productId]
  );
  let product = results && results.length > 0 ? results[0] : {};
  console.log(">>> check res: ", results);
  switch (product.adr_start) {
    case "HAN":
      product.adr_start = "Hà Nội";
      break;
    case "HCM":
      product.adr_start = "Tp Hồ Chí Minh";
      break;
    case "DAN":
      product.adr_start = "Đà Nẵng";
      break;
  }
  switch (product.adr_end) {
    case "HAN":
      product.adr_end = "Hà Nội";
      break;
    case "HCM":
      product.adr_end = "Tp Hồ Chí Minh";
      break;
    case "DAN":
      product.adr_end = "Đà Nẵng";
      break;
  }
  res.render("UpdateProduct", { productUpdate: product });
};
const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let fullname = req.body.fullname;
  let passwords = req.body.passwords;
  let userId = req.body.userId;

  await updateUserById(fullname, email, passwords, userId);
  res.redirect("/admin?error=updateuser");
};
const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let sql = `DELETE FROM Users WHERE id=?`;
  let [results, fields] = await connection.query(sql, [userId]);
  res.redirect("/admin?error=deleteuser");
};

const postDeleteProduct = async (req, res) => {
  const productId = req.params.id;
  let sql = `DELETE FROM Products WHERE id=?`;
  let [results, fields] = await connection.query(sql, [productId]);
  res.redirect("/admin?error=deleteproduct");
};
const postUpdateProduct = async (req, res) => {
  let productId = req.body.id;
  let adr_start = req.body.adr_start;
  let adr_end = req.body.adr_end;
  let code = req.body.code;
  let day_start = req.body.day_start;
  let time_start = req.body.time_start;
  let time_end = req.body.time_end;
  let price = req.body.price;
  switch (adr_start) {
    case "Hà Nội":
      adr_start = "HAN";
      break;
    case "Tp Hồ Chí Minh":
      adr_start = "HCM";
      break;
    case "Đà Nẵng":
      adr_start = "DAN";
      break;
  }
  switch (adr_end) {
    case "Hà Nội":
      adr_end = "HAN";
      break;
    case "Tp Hồ Chí Minh":
      adr_end = "HCM";
      break;
    case "Đà Nẵng":
      adr_end = "DAN";
      break;
  }
  await updateProductById(
    code,
    time_start,
    time_end,
    price,
    adr_start,
    adr_end,
    day_start,
    productId
  );
  res.redirect("/admin?error=updateproduct");
};
const postCreateProduct = async (req, res) => {
  let adr_start = req.body.adr_start;
  let adr_end = req.body.adr_end;
  let code = req.body.code;
  let day_start = req.body.day_start;
  let time_start = req.body.time_start;
  let time_end = req.body.time_end;
  let price = req.body.price;
  switch (adr_start) {
    case "Hà Nội":
      adr_start = "HAN";
      break;
    case "Tp Hồ Chí Minh":
      adr_start = "HCM";
      break;
    case "Đà Nẵng":
      adr_start = "DAN";
      break;
  }
  switch (adr_end) {
    case "Hà Nội":
      adr_end = "HAN";
      break;
    case "Tp Hồ Chí Minh":
      adr_end = "HCM";
      break;
    case "Đà Nẵng":
      adr_end = "DAN";
      break;
  }
  let sql = `INSERT INTO Products (code,time_start,time_end,price,adr_start,adr_end,day_start)
  VALUES(?,?,?,?,?,?,?);`;
  const [results, fields] = await connection.query(sql, [
    code,
    time_start,
    time_end,
    price,
    adr_start,
    adr_end,
    day_start,
  ]);
  console.log(results);
  res.redirect("/admin?error=createproduct");
};
const postCreateUser = async (req, res) => {
  let check = req.body.check;
  let email = req.body.email;
  let fullname = req.body.fullname;
  let passwords = req.body.passwords;
  let sql = "SELECT * FROM Users WHERE email = ?";
  const [rows] = await connection.query(sql, [email]);
  console.log(rows);
  if (rows.length <= 0) {
    let [results, fields] = await connection.query(
      `INSERT INTO Users (fullname,email,passwords)
        VALUES(?,?,?);`,
      [fullname, email, passwords]
    );
    console.log(">>> check results: ", results);
    if (check == "1") return res.redirect("/admin?error=createuser");
    else return res.redirect("/index?error=createuser");
    return;
  } else {
    if (check == "1") return res.redirect("/admin?error=createuserfail");
    else return res.redirect("/signin?error=invalid");
  }
};
const postCheckUser = async (req, res) => {
  console.log("Đã chạy");
  let email = req.body.email;
  let passwords = req.body.passwords;
  console.log(email);
  console.log(passwords);

  let sql = "SELECT * FROM Users WHERE email = ?";
  if (email == "admin@gmail.com" && passwords == "admin1") {
    console.log("True");
    return res.redirect("/admin");
  }

  try {
    // Use promisePool.query instead of connection.promise().query
    const [rows] = await connection.query(sql, [email]);
    console.log(rows);
    if (rows.length <= 0) {
      res.redirect("/index?error=invalid");
      return;
    }
    let user = rows[0];
    let pass_fromdb = user.passwords;
    let user_id = user.id;
    // Sử dụng bcrypt để so sánh mật khẩu nhập vào với mật khẩu đã băm trong cơ sở dữ liệu
    const bcrypt = require("bcrypt");
    const match = passwords == pass_fromdb ? true : false;
    console.log(match);
    if (match) {
      console.log("OK");
      res.redirect(`/home/${user_id}`);
    } else {
      console.log("Not OK");
      res.redirect("/index?error=invalid1");
    }
  } catch (err) {
    console.error("Error during database operation", err);
    return res.status(500).send("Internal Server Error");
  }
};
const postSearchProduct = async (req, res) => {
  const adr_start = req.body.adr_start;
  const adr_end = req.body.adr_end;
  const day_start = req.body.day_start;
  const user_id = req.body.user_id;
  // Lọc các chuyến bay dựa trên tiêu chí tra cứu
  let flight = await getAllProducts();
  const matchingFlights = flight.filter((flight) => {
    return (
      flight.adr_start == adr_start &&
      flight.adr_end == adr_end &&
      flight.day_start == day_start
    );
  });
  let sql = "SELECT * FROM Users WHERE id = ?";
  const [rows] = await connection.query(sql, [user_id]);
  let user_name = rows[0].fullname;
  // Hiển thị trang kết quả với các chuyến bay đã lọc
  res.render(`results`, {
    listProducts: matchingFlights,
    user_id: user_id,
    user_name: user_name,
  });
};
// const getlogin
module.exports = {
  getindex,
  getlogin,
  getintro,
  getsignin,
  getsupport,
  getpayment,
  getResults,
  getmisspassword,
  getsearch,
  getResults,
  gethome,
  getadmin,
  getUpdateProduct,
  getUpdateUser,
  postCreateUser,
  postCheckUser,
  postUpdateUser,
  postDeleteUser,
  postCreateProduct,
  postUpdateProduct,
  postDeleteProduct,
  postSearchProduct,
};
