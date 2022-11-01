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



async function removeItemFromCart(req, res) {
  let UUID = req.params.id;
  let admin_id = req.params.dod_id;
  pool.query(
            `UPDATE users SET shopping_cart = shopping_cart - 
            Cast((SELECT position - 1 FROM users, jsonb_array_elements(shopping_cart) with 
                ordinality arr(item_object, position) 
                WHERE dod_id='${admin_id}' and item_object->>'UUID' = '${UUID}') as int)
                WHERE dod_id='${admin_id}'`,
    (error, results) => {
      if (error) {
        return res.send("error" + error);
      }
      console.log("updated count in the inventory");
      res.status(204);
      res.send("Success");
    }
  );
}



module.exports = {
  removeItemFromCart,
};