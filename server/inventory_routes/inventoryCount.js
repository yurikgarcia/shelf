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



async function updateItemCount(req, res) {
  let newCount = req.params.newCount;
  let UUID = req.params.id;
  let admin_id = req.params.dod_id;
  let ogWarehouse = req.params.ogWarehouse;
  // console.log("HITTITNNGGGG SUBTRACT FROM COUNT")
  pool.query(
    `UPDATE ${ogWarehouse}
          SET item_count='${newCount}'
            WHERE item_id = '${UUID}'`,
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