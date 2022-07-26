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



async function updateItemCount(req, res) {
  let newCount = req.params.newCount;
  let UUID = req.params.id;
  console.log("count being pushed",newCount);
  console.log("uuid", UUID);
  pool.query(
    `UPDATE inventory 
          SET item_count='${newCount}'
            WHERE item_id = '${UUID}';
            UPDATE users SET shopping_cart = NULL 
            WHERE dod_id = '123456789'`,
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
  updateItemCount,
};