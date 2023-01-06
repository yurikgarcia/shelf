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


//////PATCH CALL THAT UPDATES THE USERS WAREHOUSE PERMISSIONS
async function updateUserPermissionsNull(req, res) {

  console.log("NULL PARASM", req.body)
  pool.query(
    `UPDATE users SET warehouse_access = null
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





module.exports = {
  updateUserPermissionsNull,
};