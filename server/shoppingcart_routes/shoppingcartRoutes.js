const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../auth_routes/authRoutes");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "shelfdatabase.ca4lcabxs5eo.us-gov-west-1.rds.amazonaws.com",
  database: "shelfdatabase",
  password: "Shelfcodesucks!",
  port: "5432",
  ssl: {
    rejectUnauthorized: false,
  },
});

//GET call that fetches the shopping_cart table in database in 
//order to display the items in the cart

async function getCart(req, res) {
  verifyToken(req, res, () => {
    jwt.verify(req.token, "secretkey", () => {
      if (req.token === undefined) return res.send(403);
      let user_id = req.params.dod_id;
      pool.query(`SELECT * FROM users WHERE dod_id = '${user_id}'`, (error, results) => {
        if (error) {
          return res.send("error" + error);
        }
        res.send(results.rows);
      });
    });
  });
}

//GET call that fetches the shopping_cart column in database in 
//order to display the items in the cart

async function getCartColumn(req, res) {
  let adminID = req.params.adminID;
  verifyToken(req, res, (authData) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (authData === undefined) return res.send(403);
      pool.query(`SELECT shopping_cart FROM users WHERE dod_id = '${adminID}'`, (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        res.send(results.rows);
      });
    });
  });
};


//PATCH call to add item to JSON cell inside of users table in the shopping_cart column (jsob)
// based on the dod_id of the logged in user

async function addToCart(req, res) {
  console.log("ADDED TO CART!!!!!!!", req.body)
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
    UUID: req.body.UUID,
    Quantity: req.body.Quantity,
    Original_warehouse: req.body.original_warehouse,
    Original_uuid: req.body.original_uuid,
  };
  let user_id = req.params.dod_id;
  let date = req.params.current_date;
  console.log("IS IT THIS?????", req.body)
  pool.query(
    `UPDATE users SET shopping_cart = COALESCE(shopping_cart, '[]'::jsonb) ||
    '{"Name": "${params.Name}",
      "UUID": "${params.UUID}",
      "Brand": "${params.Brand}",
      "Count": "${params.Count}",
      "Gender": "${params.Gender}",
      "NSN": "${params.NSN}",
      "Size": "${params.Size}",
      "Returnable": "${params.Returnable}",
      "Quantity": "${params.Quantity}",
      "Date" : "${date}",
      "Original_warehouse" : "${req.body.Original}",
      "Original_uuid" : "${req.body.uuid}", 
      "UUIDfetcha" : "${params.UUID}${date}"}' ::jsonb
      WHERE dod_id= '${user_id}'`,
      (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        console.log("placed item into shopping cart");
        res.status(200);
        res.send("Success")
      }
    );
  }

  //PATCH call to add item to JSON cell inside of users table in the shopping_cart column (jsob)
// based on the dod_id of the logged in user
// from the user returning inventory items

async function addToCartFromUser(req, res) {
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
    UUID: req.body.UUID,
    Quantity: req.body.Quantity,
    // Original_warehouse: req.body.Original.Warehouse
  };
  let user_id = req.params.dod_id;
  let date = req.params.current_date; 
  console.log("FROM USER TOOOO CART", req.body)
  pool.query(
    `UPDATE users SET shopping_cart = COALESCE(shopping_cart, '[]'::jsonb) ||
    '{"Name": "${params.Name}",
      "UUID": "${params.UUID}",
      "Brand": "${params.Brand}",
      "Count": "${params.Count}",
      "NSN": "${params.NSN}",
      "Size": "${params.Size}",
      "Returnable": "${params.Returnable}",
      "Quantity": "${params.Quantity}",
      "Date" : "${date}",
      "Original_warehouse" : "${req.body.Original}",
      "UUIDfetcha" : "${req.body.uuidFetcha}"}' ::jsonb
      WHERE dod_id= '${user_id}'`,
      (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        console.log("placed item into shopping cart");
        res.status(200);
        res.send("Success")
      }
    );
  }

//DELETES items from shopping_cart JSON cell
//based on items' UUID

async function deleteItemFromShoppingCart(req, res) {
  const item_id = req.params.id;
  let user_id = req.params.dod_id;
  console.log('==> Item ID to be deleted', item_id)
  pool.query(
    `UPDATE users SET shopping_cart = shopping_cart - 
    Cast((SELECT position - 1 FROM users, jsonb_array_elements(shopping_cart) with 
        ordinality arr(item_object, position) 
        WHERE dod_id='${user_id}' and item_object->>'UUID' = '${item_id}') as int)
        WHERE dod_id='${user_id}';`,
    (error, results) => {
      if (error) {
        res.send("error" + error);
      }
      console.log("removed from DB");
      res.status(200);
      res.send("Success")
    }
  );
}

// //////Clears Shopping Cart
// async function clearCart(req, res) {
//   console.log("CLEAR CARTTTTTTTTTTTT", req.body)
//     // pool.query(
//   //   `UPDATE users SET shopping_cart = null
//   //     WHERE dod_id = '${req.body.DoD}'`,
//   //     (error, results) => {
//   //       if (error) {
//   //         res.send("error" + error);
//   //       }
//   //       console.log("updated warehouse permissions");
//   //       res.status(200);
//   //       res.send("Success")
//   //     }
//   //   );
// }

module.exports = {
  getCart,
  addToCart,
  deleteItemFromShoppingCart,
  addToCartFromUser,
  getCartColumn,
  // clearCart
};
