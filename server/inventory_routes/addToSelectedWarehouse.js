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



// async function addToSelectedWarehouse(req, res) {
//   let newCount = req.params.newCount;
//   let uuid = req.params.id;
//   let admin_id = req.params.dod_id; /////this needs to be logged in user dod_id
//   let user_id = req.params.user_dodid;
//   let ogWarehouse = req.body.Original_warehouse
// console.log("ISSSS THIIIIISSSS HITTTTTTIIIIIIINNNNNGGGGG", req.params)
//   pool.query(
//     `WITH cte 
//       AS ( UPDATE ${ogWarehouse}
//     SET item_count = '${newCount}'
//     WHERE item_id = '${uuid}'
//     )
//     UPDATE users SET shopping_cart = NULL WHERE dod_id = '${admin_id}'; 
//     UPDATE users SET issued_items = issued_items - 
//         Cast((SELECT position - 1 FROM users, jsonb_array_elements(issued_items) with 
//             ordinality arr(item_object, position) 
//         WHERE dod_id='${user_id}' and item_object->>'UUIDfetcha' = '${req.body.uuidDate}') as int)
//         WHERE dod_id='${user_id}';
//     `,
//     (error, results) => {
//       if (error) {
//         return res.send("error" + error);
//       }
//       console.log("updated in DB");
//       res.status(204);
//       res.send("Success");
//     }
//   );
// }

async function addToSelectedWarehouse(req, res) {
  let selectedWarehouse = req.params.selectedWarehouse
  console.log("HIIIIIIIIIIIIT  YYYYOOOUUUU BITCHHHHHHHHHHHHH", req.params)
  console.log("BBBOOODDDYYYY", req.body)
  console.log("NAME", req.body.item.Name)
  console.log("PAAAAARRRRAAAMMMMMMMMMMMMM", req.params)
  pool.query(
    `INSERT INTO ${selectedWarehouse} (item_name, brand, nsn, item_size, gender, item_count) values('${req.params.name}', '${req.params.brand}', '${req.params.nsn}', '${req.params.size}', '${req.params.gender}', '${req.params.quantity}')`,
    (error, results) => {
      if (error) {
        res.send("error" + error);
      }
      console.log("ADDED");
      res.status(200);
      res.send("Success");
    }
  );
}



module.exports = {
  addToSelectedWarehouse,
};