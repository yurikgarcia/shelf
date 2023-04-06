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


async function clearCart(req, res) {
  console.log('==> Item ID to be deleted', req.params)
  let dod_id = req.params.dod_id
  console.log("DOD", dod_id)
  pool.query(
    `UPDATE users SET shopping_cart = null
      WHERE dod_id = '${dod_id}'`,
      (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        console.log("updated warehouse permissions");
        res.status(200);
        res.send("Success")
      }
    );
}





module.exports = {
  clearCart,
};