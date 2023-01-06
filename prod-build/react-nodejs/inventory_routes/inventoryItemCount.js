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


async function itemCurrentCount(req, res) {
  let UUID = req.params.uuid;
  let ogWarehouse = req.params.ogWarehouse
  console.log("HITTING QTY")
  console.log(` UUID :${UUID}, ogWarehouse: ${ogWarehouse}`)
      pool.query(`SELECT item_count FROM ${ogWarehouse} WHERE item_id = '${UUID}'`, (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        res.send(results.rows);
      });
}

async function cartItemCount(req, res) {
  let UUID = req.params.uuid;
  let ogWarehouse = req.params.ogWarehouse
  console.log("HITTING NEW ROUTE")
  console.log(` UUID :${UUID}, ogWarehouse: ${ogWarehouse}`)
      pool.query(`SELECT item_count FROM ${ogWarehouse} WHERE item_id = '${UUID}'`, (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        res.send(results.rows);
      });
}


module.exports = {
  itemCurrentCount,
  cartItemCount
};