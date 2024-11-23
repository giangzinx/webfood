const connection = require("../config/database");
const mysql = require("mysql2");
const { name } = require("ejs");
const {
  getAllCustomers,
  updateCustomerById,
  getAllFoods,
  updateFoodById,
} = require("../services/CRUDService");
var session = require("express-session");

const getindex = (req, res) => {
  res.render("index");
};

const gethome = async (req, res) => {
  res.render("home");
};
const getAdmin = async (req, res) => {
  let userId = 1;
  let Customers = await getAllCustomers();
  res.render("admin", {
    listCustomers: Customers,
    userId: userId,
  });
};
const getAdminOrder = async (req, res) => {
  res.render("adminorder");
};
const getAdminFood = async (req, res) => {
  let Foods = await getAllFoods();
  res.render("adminfood", {
    listFoods: Foods,
  });
};
const postCheckCustomer = async (req, res) => {
  let phone = req.body.phone;
  let password = req.body.password;
  let Adminsql = "SELECT * FROM Admin WHERE username = ?";
  let sql = "SELECT * FROM Customer WHERE phonenumber = ?";
  try {
    // Use promisePool.query instead of connection.promise().query
    const [Adminrows] = await connection.query(Adminsql, [phone]);
    if (Adminrows.length > 0) {
      let Admin = Adminrows[0];
      let pass_fromdb = Admin.password;
      let Admin_name = Admin.username;
      const bcrypt = require("bcrypt");
      const match = password == pass_fromdb ? true : false;
      console.log(match);
      if (match) {
        console.log("OK");
        res.redirect("/admin/");
      }
    } else {
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
        res.redirect(`/home/`);
      } else {
        console.log("Not OK");
        res.redirect("/index?error=invalid1");
      }
    }
  } catch (err) {
    console.error("Error during database operation", err);
    return res.status(500).send("Internal Server Error");
  }
};
const postCreateCustomer = async (req, res) => {
  let check = req.body.check;
  let phonenumber = req.body.phonenumber;
  let name = req.body.name;
  let password = req.body.password;
  let sql = "SELECT * FROM Customer WHERE phonenumber = ?";
  const [rows] = await connection.query(sql, [phonenumber]);
  console.log(rows);
  if (rows.length <= 0) {
    let [results, fields] = await connection.query(
      `INSERT INTO Customer (phonenumber,password,name)
        VALUES(?,?,?);`,
      [phonenumber, password, name]
    );
    console.log(">>> check results: ", results);
    if (check == "1") return res.redirect("/admin?error=createcustomer");
    else return res.redirect("/index?error=createcustomer");
    return;
  } else {
    if (check == "1") return res.redirect("/admin?error=createcustomerfail");
    else return res.redirect("/index?error=createcustomerfail");
  }
};
const postUpdateCustomer = async (req, res) => {
  let customer_id = req.body.customer_id;
  let name = req.body.name;
  let phonenumber = req.body.phonenumber;
  let password = req.body.password;

  await updateCustomerById(customer_id, name, phonenumber, password);
  res.redirect("/admin?error=updatecustomer");
};
const postDeleteCustomer = async (req, res) => {
  const userId = req.params.id;
  let sql = `DELETE FROM Customer WHERE customer_id=?`;
  let [results, fields] = await connection.query(sql, [userId]);
  res.redirect("/admin?error=deletecustomer");
};
const postUpdateFood = async (req, res) => {
  const foodId = req.params.id;
  const { status } = req.body;

  await updateFoodById(foodId, status);
  res.redirect("/adminfood");
};
// const getlogin
module.exports = {
  getindex,
  gethome,
  getAdmin,
  getAdminOrder,
  getAdminFood,
  postCheckCustomer,
  postCreateCustomer,
  postUpdateCustomer,
  postDeleteCustomer,
  postUpdateFood,
};
