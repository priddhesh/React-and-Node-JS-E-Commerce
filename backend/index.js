require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require("mysql2");
const {authenticate, getProducts, deleteProduct } = require("./database");

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

app
  .route('/')
  .get(async (req,res)=>{
    //  const data = await getUsers();
    //  console.log(data);
    // pool.query(
    //   `INSERT INTO  users(email,name,password) VALUES("abc@gmail.com","abc","abc")`,
    //   (err, rows) => {
    //     if (err) throw err;
    //   }
    // );
    res.send("app is working");
  });

app.
   route("/register")
   .post(async (req,res)=>{
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;

    pool.query(
        `INSERT INTO users(email,name,password) VALUES('${email}','${name}','${password}')`,
        (err, rows) => {
          if (err) throw err;
        }
      );
      res.send(req.body);
   });

app. 
   route("/login")
   .post(async (req,res)=>{
      let email = req.body.email;
      let password = req.body.password;

      let [data] = await authenticate(email,password);
      if(data){
      res.send(data);
      }else{
        res.send({result: "No user found"});
      }
   });

app.
   route("/addProduct")
   .post(async (req,res)=>{
    let name = req.body.name;
    let price = req.body.price;
    let category = req.body.category;
    let userID = req.body.userID;
    let company = req.body.company;

    pool.query(
        `INSERT INTO products(name,price,category,userID,company) VALUES('${name}','${price}','${category}','${userID}','${company}')`,
        (err, rows) => {
          if (err) throw err;
        }
      );
      res.send(req.body);
   });

  app.
     route("/getProducts")
     .get(async (req,res)=>{
      let [products] = await getProducts();
      if(products){
      res.send(products);
      }else{
        res.send({result: "No products found"});
      }
    });
  
  app.
     route("/deleteProduct")
     .delete(async (req,res)=>{
        let {name, price,category} = req.body;
        let [data] = await deleteProduct(name,price,category);
        res.send(data);
     });
  
  app.
     route("/updateProduct")
     .patch(async (req,res)=>{
        let {name, price,category,prevName,prevPrice,prevCategory} = req.body;
        let [data] = await deleteProduct(name,price,category);
        res.send(data);
     });

app.listen(5000,()=>{
    console.log("Listening on port 5000");
})