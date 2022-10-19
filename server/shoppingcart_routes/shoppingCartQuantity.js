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

async function updateQuantity(req, res) {
  let params = {
    Quantity: req.body.Quantity,
  };
  let user_id = req.params.user_dod;
  let ogWarehouse = req.params.ogWarehouse;
  const item_id = req.params.id;
  pool.query(
    `UPDATE users
    SET shopping_cart = s.json_array
    FROM (
        SELECT 
            jsonb_agg(
                CASE WHEN elems ->> 'UUID' = '${item_id}' THEN
                    jsonb_set(elems, '{Quantity}', '${params.Quantity}')
                ELSE elems  END
            ) as json_array
        FROM
            users,
            jsonb_array_elements(shopping_cart) elems
    ) s
    WHERE dod_id = '${user_id}'`,
      (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        console.log("updated item quantity into shopping cart");
        res.status(200);
        res.send("Success")
      }
    );
  }


module.exports = {
  updateQuantity
};
