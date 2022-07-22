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
  // let params = {
  //   id: req.body.id,
  //   Delete: req.body.Delete,
  //   Edit: req.body.Edit,
  //   Name: req.body.Name,
  //   Brand: req.body.Brand,
  //   NSN: req.body.NSN,
  //   Bldg: req.body.Bldg,
  //   Size: req.body.Size,
  //   Count: req.body.Count,
  //   Gender: req.body.Gender,
  //   Aisle: req.body.Aisle,
  //   Initial: req.body.Initial,
  //   MinCount: req.body.MinCount,
  //   Ordered: req.body.Ordered,
  //   Returnable: req.body.Returnable,
  // };
  let user_id = req.params.dod_id;
  console.log("user_id", user_id);
  pool.query(
    `UPDATE users
    SET shopping_cart = s.json_array
    FROM (
        SELECT 
            jsonb_agg(
                CASE WHEN elems ->> 'UUID' = '190' THEN
                    jsonb_set(elems, '{Quantity}', '"1200"')
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
