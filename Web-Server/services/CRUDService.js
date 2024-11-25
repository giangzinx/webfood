const connection = require("../config/database");
const getAllCustomers = async () => {
  let [results, fields] = await connection.query("select * from Customer");
  return results;
};
const updateCustomerById = async (customer_id, name, phonenumber, password) => {
  let [results, fields] = await connection.query(
    `
  UPDATE Customer
  SET name = ?, phonenumber= ?, password =?
  WHERE customer_id =  ?
  `,
    [name, phonenumber, password, customer_id]
  );
};
const getAllShipper = async () => {
  let [results, fields] = await connection.query("select * from Shipper");
  return results;
};
const updateShipperById = async (shipper_id, name, phonenumber, password) => {
  let [results, fields] = await connection.query(
    `
  UPDATE Shipper
  SET name = ?, phonenumber= ?, password =?
  WHERE shipper_id =  ?
  `,
    [name, phonenumber, password, shipper_id]
  );
};
const getAllFoods = async () => {
  let [results, fields] = await connection.query("select * from Food");
  return results;
};
const updateFoodById = async (foodId, status) => {
  let [results, fields] = await connection.query(
    `
    UPDATE Food 
    SET status = ?
    WHERE food_id =  ?;
  `,
    [status, foodId]
  );
};
const getAllOrders = async () => {
  let [results, fields] = await connection.query(
    `SELECT o.*, f.name AS food_name, f.price AS food_price, c.phonenumber AS customer_phone, c.name AS customer_name
    FROM Orders o
    JOIN Food f ON o.food_id = f.food_id
    JOIN Customer c ON o.customer_id = c.customer_id
    `
  );
  return results;
};
const getCustomerOrders = async () => {
  let [results, fields] = await connection.query(
    `SELECT o.*, f.name AS food_name, f.price AS food_price
    FROM Orders o
    JOIN Food f ON o.food_id = f.food_id
    WHERE o.status = 'Đang chờ xử lý'`
  );
  return results;
};
const getShipperOrders = async (shipper_id) => {
  let [results, fields] = await connection.query(
    `SELECT o.*, f.name AS food_name, f.price AS food_price
    FROM Orders o
    JOIN Food f ON o.food_id = f.food_id
    WHERE o.shipper_id = ?;`,
    [shipper_id]
  );
  return results;
};
const updateOrderById = async (order_id, status) => {
  let [results, fields] = await connection.query(
    `
    UPDATE Orders 
    SET status = ?
    WHERE order_id =  ?;
  `,
    [status, order_id]
  );
};
const postAcceptOrder = async (req, res) => {
  const order_id = req.params.id;
  await updateOrderById(order_id, "Đang giao hàng");
  res.redirect(`/shipper/${req.session.user.shipper_id}`);
};
module.exports = {
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
};
