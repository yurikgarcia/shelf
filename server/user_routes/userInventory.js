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

//PATCH call to add entire shopping cart of the logged admin to JSON cell 
//inside of user selected'd issued_items column (jsob)

async function addToIssuedItems(req, res) {
  const item_id = req.params.id;
  console.log("PARAMMMMMSSSS", req.params)
  pool.query(
    `UPDATE users SET issued_items = COALESCE(issued_items, '[]'::jsonb) ||
    ((SELECT shopping_cart FROM users WHERE dod_id = '${req.params.id}')) ::jsonb
    WHERE dod_id= '${req.params.dod_id}'`,
      (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        console.log("issued items");
        res.status(200);
        res.send("Success")
      }
    );
  }




module.exports = {
addToIssuedItems
};