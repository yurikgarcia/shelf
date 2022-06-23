const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../auth_routes/authRoutes");
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

//GET call that fetches the shopping_cart table in database in 
//order to display the items in the cart

async function getCart(req, res) {
  verifyToken(req, res, (authData) => {
    console.log(authData);
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (authData === undefined) return res.send(403);
      pool.query("SELECT * FROM shopping_cart", (error, results) => {
        if (error) {
          return res.send("error" + error);
        }
        res.send(results.rows);
      });
    });
  });
}


//POST call to add item to JSON cell inside of shopping_cart table
// based on the dod_id of the logged in user

async function addToCart(req, res) {
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
    `UPDATE shopping_cart SET items = items || 
    '{"Name":"${params.Name}",
      "Brand":"${params.Brand}",
      "NSN":"${params.NSN}",
      "Size":"${params.Size}",
      "Count":"${params.Count}",
      "Gender":"${params.Gender}",
      "UUID":"${params.Delete}"}' ::jsonb
      WHERE dod_id = '263748598'`,
      (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        console.log("placed in DB");
        res.status(200);
      }
    );
  }

//DELETES items from shopping_cart JSON cell
//based on items' UUID

async function deleteItemFromShoppingCart(req, res) {
  const item_id = req.params.id;
  // console.log('==> Item ID to be deleted', item_id)
  pool.query(
    `UPDATE shopping_cart SET items = items - 
    Cast((SELECT position - 1 FROM shopping_cart, jsonb_array_elements(items) with 
      ordinality arr(item_object, position) 
    WHERE dod_id='263748598' and item_object->>'UUID' = '${item_id}') as int)
    WHERE dod_id='263748598';`,
    (error, results) => {
      if (error) {
        res.send("error" + error);
      }
      console.log("removed from DB");
      res.status(200);
      res.send("Success");
    }
  );
}

module.exports = {
  getCart,
  addToCart,
  deleteItemFromShoppingCart
};
