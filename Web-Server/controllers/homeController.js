const connection = require("../config/database");
const mysql = require("mysql2");
const { name } = require("ejs");
const {
  getAllCustomers,
  updateCustomerById,
  getAllShipper,
  updateShipperById,
  getAllFoods,
  updateFoodById,
  getAllOrders,
  updateOrderById,
  getCustomerOrders,
  getShipperOrders,
} = require("../services/CRUDService");
var session = require("express-session");

const getindex = (req, res) => {
  res.render("index");
};

const gethome = async (req, res) => {
  let customer_id = req.params.id;
  console.log(">>> customer_id: ", customer_id);
  let sql = "SELECT * FROM Customer WHERE customer_id = ?";
  const [rows] = await connection.query(sql, [customer_id]);
  console.log(rows);
  let customer_name = rows[0].name;
  let Foods = await getAllFoods();
  let groupedFoods = [];
  let groupSize = 5;
  for (let i = 0; i < Foods.length; i += groupSize) {
    groupedFoods.push(Foods.slice(i, i + groupSize));
  }
  res.render("home", {
    customer_name: customer_name,
    customer_id: customer_id,
    groupedFoods: groupedFoods,
  });
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
  let index = 1;
  let Orders = await getAllOrders();
  res.render("adminorder", {
    listOrders: Orders,
    index: index,
  });
};
const getAdminShipper = async (req, res) => {
  let userId = 1;
  let Shippers = await getAllShipper();
  res.render("adminshipper", {
    listShippers: Shippers,
    userId: userId,
  });
};
const getAdminFood = async (req, res) => {
  let Foods = await getAllFoods();
  res.render("adminfood", {
    listFoods: Foods,
  });
};
const getorder = async (req, res) => {
  let customer_id = req.params.customer_id;
  let food_id = req.params.food_id;
  let sql = "SELECT * FROM Customer WHERE customer_id = ?";
  const [rows] = await connection.query(sql, [customer_id]);
  customer_name = rows[0].name;
  customer_phone = rows[0].phonenumber;
  let sql1 = "SELECT * FROM Food WHERE food_id = ?";
  const [rows1] = await connection.query(sql1, [food_id]);
  food_name = rows1[0].name;
  food_price = rows1[0].price;
  console.log(food_price);
  res.render("order", {
    customer_id: customer_id,
    customer_name: customer_name,
    customer_phone: customer_phone,
    food_id: food_id,
    food_name: food_name,
    food_price: food_price,
  });
};
const getshipper = async (req, res) => {
  let shipper_id = req.params.id;
  let index = 1;
  let sql = "SELECT * FROM Shipper WHERE shipper_id = ?";
  const [rows] = await connection.query(sql, [shipper_id]);
  let CustomerOrder = await getCustomerOrders();
  console.log(CustomerOrder);
  let ShipperOrder = await getShipperOrders(shipper_id);
  console.log(ShipperOrder);
  let shipper_name = rows[0].name;
  res.render("shipper", {
    shipper_name: shipper_name,
    shipper_id: shipper_id,
    index: index,
    ListCustomerOrder: CustomerOrder,
    ListShipperOrder: ShipperOrder,
  });
};
const postCheckCustomer = async (req, res) => {
  let phone = req.body.phone;
  let password = req.body.password;
  let Adminsql = "SELECT * FROM Admin WHERE username = ?";
  let Shippersql = "SELECT * FROM Shipper WHERE phonenumber = ?";
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
      const [Shipperrows] = await connection.query(Shippersql, [phone]);
      if (Shipperrows.length > 0) {
        const [rows] = await connection.query(Shippersql, [phone]);
        console.log(rows);
        if (rows.length <= 0) {
          res.redirect("/index?error=invalid");
          return;
        }
        let shipper = rows[0];
        let pass_fromdb = shipper.password;
        let shipper_id = shipper.shipper_id;
        // Sử dụng bcrypt để so sánh mật khẩu nhập vào với mật khẩu đã băm trong cơ sở dữ liệu
        const bcrypt = require("bcrypt");
        const match = password == pass_fromdb ? true : false;
        console.log(match);
        if (match) {
          console.log("OK");
          res.redirect(`/shipper/${shipper_id}`);
        } else {
          console.log("Not OK");
          res.redirect("/index?error=invalid1");
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
        let customer_id = customer.customer_id;
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
const postCreateShipper = async (req, res) => {
  let phonenumber = req.body.phonenumber;
  let name = req.body.name;
  let password = req.body.password;
  let sql = "SELECT * FROM Shipper WHERE phonenumber = ?";
  const [rows] = await connection.query(sql, [phonenumber]);
  console.log(rows);
  if (rows.length <= 0) {
    let [results, fields] = await connection.query(
      `INSERT INTO Shipper (phonenumber,password,name)
        VALUES(?,?,?);`,
      [phonenumber, password, name]
    );
    console.log(">>> check results: ", results);
    return res.redirect("/admin-shipper?error=createshipper");
  } else {
    return res.redirect("/admin-shipper?error=createshipperfail");
  }
};
const postUpdateShipper = async (req, res) => {
  let shipper_id = req.body.shipper_id;
  let name = req.body.name;
  let phonenumber = req.body.phonenumber;
  let password = req.body.password;

  await updateShipperById(shipper_id, name, phonenumber, password);
  res.redirect("/admin-shipper?error=updateshipper");
};
const postDeleteShipper = async (req, res) => {
  const userId = req.params.id;
  let sql = `DELETE FROM Shipper WHERE shipper_id=?`;
  let [results, fields] = await connection.query(sql, [userId]);
  res.redirect("/admin-shipper?error=deleteshipper");
};
const postUpdateFood = async (req, res) => {
  const foodId = req.params.id;
  const { status } = req.body;

  await updateFoodById(foodId, status);
  res.redirect("/adminfood");
};
const postCreateOrder = async (req, res) => {
  const {
    customer_id,
    food_id,
    customer_name,
    phone_number,
    address,
    food_name,
    food_price,
    quantity,
    total_price,
    order_date,
    order_time,
    notes,
  } = req.body;

  // Lưu dữ liệu vào bảng `Order`
  const sql = `
    INSERT INTO Orders (customer_id, food_id, quantity, total_price, address, order_date, order_time, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  let [results, fields] = await connection.query(sql, [
    customer_id,
    food_id,
    quantity,
    total_price,
    address,
    order_date,
    order_time,
    notes,
  ]);
  res.redirect(`/home/${customer_id}`);
};
const postAcceptOrder = async (req, res) => {
  const { orderId, shipperId } = req.body;
  const sql = `
  UPDATE Orders
  SET shipper_id = ?, status = 'Đang vận chuyển'
  WHERE order_id = ?;
  `;
  let [results, fields] = await connection.query(sql, [shipperId, orderId]);
  res.redirect(`/shipper/${shipperId}`);
};
const postCompleteOrder = async (req, res) => {
  const { orderId, shipperId } = req.body;
  const sql = `
  UPDATE Orders
  SET status = 'Đã vận chuyển'
  WHERE order_id = ?;
  `;
  let [results, fields] = await connection.query(sql, [orderId]);
  res.redirect(`/shipper/${shipperId}`);
};
const postCancelOrder = async (req, res) => {
  const { orderId, shipperId } = req.body;
  const sql = `
  UPDATE Orders
  SET status = 'Đã hủy'
  WHERE order_id = ?;
  `;
  let [results, fields] = await connection.query(sql, [orderId]);
  res.redirect(`/shipper/${shipperId}`);
};
// const getlogin
module.exports = {
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
};
