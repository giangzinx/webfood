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
const postCheckCustomer = async (req, res) => {
  console.log("Đã chạy");
  let phone = req.body.phone;
  let password = req.body.password;
  console.log(req.body);
  console.log(phone);
  console.log(password);

  let sql = "SELECT * FROM Customer WHERE phonenumber = ?";
  try {
    // Use promisePool.query instead of connection.promise().query
    const [rows] = await connection.query(sql, [phone]);
    console.log(rows);
    if (rows.length <= 0) {
      res.redirect("/index?error=invalid");
      return;
    }
    let customer = rows[0];
    let pass_fromdb = customer.password;
    let customer_id = customer.id;
    // Sử dụng bcrypt để so sánh mật khẩu nhập vào với mật khẩu đã băm trong cơ sở dữ liệu
    const bcrypt = require("bcrypt");
    const match = password == pass_fromdb ? true : false;
    console.log(match);
    if (match) {
      console.log("OK");
      res.redirect(`/home/${customer_id}`);
    } else {
      console.log("Not OK");
      res.redirect("/index?error=invalid1");
    }
  } catch (err) {
    console.error("Error during database operation", err);
    return res.status(500).send("Internal Server Error");
  }
};

// const getlogin
module.exports = {
  getindex,
  postCheckCustomer,
  postCreateCustomer,
};
