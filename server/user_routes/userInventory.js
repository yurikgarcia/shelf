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

//PATCH call to add entire shopping cart of the logged admin to JSON cell 
//inside of user selected'd issued_items column (jsob)


async function addToIssuedItems(req, res) {
  pool.query(
    `UPDATE users SET issued_items = COALESCE(issued_items, '[]'::jsonb) ||
    ((SELECT shopping_cart FROM users WHERE dod_id = '${req.params.id}')) ::jsonb
    WHERE dod_id= '${req.params.dod_id}';
    UPDATE users SET shopping_cart = NULL 
    WHERE dod_id = '${req.params.id}'`,
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