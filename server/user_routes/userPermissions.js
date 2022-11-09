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


//////PATCH CALL THAT UPDATES THE USERS WAREHOUSE PERMISSIONS
async function updateUserPermissions(req, res) {

  console.log("PPPAAARRAMMMMMSSS", req.body)
  // console.log("BODYYYYYY.WAREHOUSES", req.body.Warehouses)

  pool.query(
    `UPDATE users SET warehouse_access = '${req.body.Warehouses}' ::jsonb
      WHERE dod_id = '${req.body.DoD}'`,
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

// `UPDATE users SET warehouse_access = '[{"Name" : "Test"}, {"Name" : "Test2"} ]' ::jsonb THIS WORKS



// //POST call to add item to JSON cell inside of users table in the shopping_cart column (jsob)
// // based on the dod_id of the logged in user

// async function addToCart(req, res) {
//   let params = {
//     id: req.body.id,
//     Delete: req.body.Delete,
//     Edit: req.body.Edit,
//     Name: req.body.Name,
//     Brand: req.body.Brand,
//     NSN: req.body.NSN,
//     Bldg: req.body.Bldg,
//     Size: req.body.Size,
//     Count: req.body.Count,
//     Gender: req.body.Gender,
//     Aisle: req.body.Aisle,
//     Initial: req.body.Initial,
//     MinCount: req.body.MinCount,
//     Ordered: req.body.Ordered,
//     Returnable: req.body.Returnable,
//   };
  
//   pool.query(
//     `UPDATE users SET shopping_cart = COALESCE(shopping_cart, '[]'::jsonb) ||
//     '{"Name":"TEST",
//       "Brand":"${params.Brand}",
//       "NSN":"${params.NSN}",
//       "Size":"${params.Size}",
//       "Count":"${params.Count}",
//       "Gender":"${params.Gender}",
//       "UUID":"${params.Delete}"}' ::jsonb
//       WHERE dod_id = '263748598'`,
//       (error, results) => {
//         if (error) {
//           res.send("error" + error);
//         }
//         console.log("placed item into shopping cart");
//         res.status(200);
//       }
//     );
//   }



module.exports = {
  updateUserPermissions,
};
