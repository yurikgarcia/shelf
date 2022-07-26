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



async function addToItemCount(req, res) {
  let newCount = req.params.newCount;
  let uuid = req.params.id;
  let admin_id = req.params.dod_id;
  pool.query(
    `WITH cte 
      AS ( UPDATE inventory
    SET item_count = '${newCount}' 
    WHERE item_id = '${uuid}'
    )
    UPDATE users SET shopping_cart = NULL WHERE dod_id = '${admin_id}';
    UPDATE users SET issued_items = issued_items - 
        Cast((SELECT position - 1 FROM users, jsonb_array_elements(issued_items) with 
            ordinality arr(item_object, position) 
        WHERE dod_id='123456789' and item_object->>'UUID' = '${uuid}') as int)
        WHERE dod_id='123456789';
    `,
    (error, results) => {
      if (error) {
        return res.send("error" + error);
      }
      console.log("updated in DB");
      res.status(204);
      res.send("Success");
    }
  );
}

//NEED TO SWAP dod_id = '123456789' with the dod_id of the user who is returning the item

module.exports = {
  addToItemCount,
};