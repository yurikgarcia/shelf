const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PRT,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function getCart(req, res) {
  pool.query("SELECT * FROM shopping_cart", (error, results) => {
    if (error) {
      return res.send("error" + error);
    }
    res.send(results.rows);
  });
};

async function addToCart(req, res) {
  //TODO: need to modify query to INSERT INTO shopping_cart (user_inv_id, dod_id, items) WHERE DODID matches the cart ID and then insert the items.
  //IDEA - add a cart ID under the users table to give each user a unique cart.
  let inventoryId = Math.floor(Math.random() * 1000000) + 1;
  let dodId = Math.floor(Math.random() * 1000000) + 1;
  let params = {
    id: req.body.id,
    Delete: req.body.Delete,
    Edit: req.body.Edit,
    Name: req.body.Name,
    Brand: req.body.Brand,
    NSN: req.body.NSN,
    Bldg: req.body.Bldg,
    Size: req.body.Size,
    Count: req.body.Count,
    Gender: req.body.Gender,
    Aisle: req.body.Aisle,
    Initial: req.body.Initial,
    MinCount: req.body.MinCount,
    Ordered: req.body.Ordered,
    Returnable: req.body.Returnable,
  };
  pool.query(
    `INSERT INTO shopping_cart (user_inv_id, dod_id, items)
  VALUES (
    '${inventoryId}',
    '${dodId}',
    array['{
      "id": "${params.id}",
      "Delete": "${params.Delete}",
      "Edit": "${params.Edit}",
      "Name": "${params.Name}",
      "Brand": "${params.Brand}",
      "NSN": "${params.NSN}",
      "Bldg": "${params.Bldg}",
      "Size": "${params.Size}",
      "Count": "${params.Count}",
      "Gender": "${params.Gender}",
      "Aisle": "${params.Aisle}",
      "Initial": "${params.Initial}",
      "MinCount": "${params.MinCount}",
      "Ordered": "${params.Ordered}",
      "Returnable": "${params.Returnable}"
    }']::json[])`,
    (error, results) => {
      if (error) {
        res.send("error" + error);
      }
      console.log("placed in DB");
      res.status(200);
    }
  );
}

module.exports = {
  getCart,
  addToCart
};
