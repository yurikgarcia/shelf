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



async function removeItemFromCart(req, res) {
  let UUID = req.params.id;
  let admin_id = req.params.dod_id;
  console.log("PARAM FROM REMOVE", req.params)
  console.log("UUID FROM REMOVE", UUID)
  console.log("ADMIN ID FROM REMOVE", admin_id)
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
      console.log("removed from shopping cart");
      res.status(204);
      res.send("Success");
    }
  );
}



module.exports = {
  removeItemFromCart,
};