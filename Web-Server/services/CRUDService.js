const connection = require("../config/database");
const getAllUsers = async () => {
  let [results, fields] = await connection.query("select * from Users");
  return results;
};
const getAllProducts = async () => {
  let [results, fields] = await connection.query("select * from Products");
  results.forEach((product) => {
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
  });
  return results;
};
const updateUserById = async (fullname, email, passwords, userId) => {
  let [results, fields] = await connection.query(
    `
  UPDATE Users
  SET fullname = ?, email= ?, passwords =?
  WHERE id =  ?
  `,
    [fullname, email, passwords, userId]
  );
};
const updateProductById = async (
  code,
  time_start,
  time_end,
  price,
  adr_start,
  adr_end,
  day_start,
  productId
) => {
  let [results, fields] = await connection.query(
    `
    UPDATE Products 
    SET code= ?, time_start = ?, time_end = ?, price = ?, adr_start = ?, adr_end = ?, day_start = ?
    WHERE id =  ?;
  `,
    [
      code,
      time_start,
      time_end,
      price,
      adr_start,
      adr_end,
      day_start,
      productId,
    ]
  );
};
module.exports = {
  getAllProducts,
  getAllUsers,
  updateUserById,
  updateProductById,
};
