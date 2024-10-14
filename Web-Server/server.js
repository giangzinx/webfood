const express = require("express");
const app = express();
const ejs = require("ejs");
const configViewEngine = require("./config/viewEngine");
const mysql = require("mysql2");
const webRoutes = require("./routes/web");
const pool = require("./config/database");
require("dotenv").config();
var port = 8000;

app.use(express.json());
app.use(express.urlencoded({extend : true}));

//config template engine
configViewEngine(app);

//Khai báo route
app.use("/", webRoutes);

app.use("/public", express.static("public"));

var server = require("http").Server(app);
server.listen(port);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Lỗi khi kết nối tới Database:", err);
    throw err;
  }
  console.log("Đã kết nối Database.");

  // Chỉ thực hiện truy vấn sau khi kết nối thành công
  connection.query("select * from Users u", function (err, results, fields) {
    if (err) {
      console.error("Lỗi khi thực hiện truy vấn:", err);
      return;
    }
    console.log(">>> Kết quả: ", results);
  });
});

console.log("Website co dia chi:");
console.log(`http://localhost:${port}`);
