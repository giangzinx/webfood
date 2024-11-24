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
module.exports = {
  getAllCustomers,
  updateCustomerById,
  getAllShipper,
  updateShipperById,
  getAllFoods,
  updateFoodById,
};
