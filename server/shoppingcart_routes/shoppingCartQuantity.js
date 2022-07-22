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
  let user_id = req.params.dod_id;
  console.log("params", req.body.Quantity);
  pool.query(
    `UPDATE users
    SET shopping_cart = s.json_array
    FROM (
        SELECT 
            jsonb_agg(
                CASE WHEN elems ->> 'UUID' = '848b8afa-d2e6-48af-995d-659f7cdd1869' THEN
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
