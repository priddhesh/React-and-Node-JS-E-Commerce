const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  })
  .promise();

const getUsers = async () => {
  try {
    const [data] = await pool.execute(`SELECT * from  users`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const authenticate = async (email, password) => {
  try {
    const [data] = await pool.query(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password]
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async () => {
  try {
    const data = await pool.query("SELECT * FROM products");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (name, price, category) => {
  try {
    const data = await pool.query(
      `DELETE FROM products WHERE name = ? AND price = ? AND category = ?`,
      [name, price, category]
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  authenticate,
  getProducts,
  deleteProduct,
};
