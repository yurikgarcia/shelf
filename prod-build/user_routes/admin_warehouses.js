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


async function adminWarehouses(req, res) {
  let adminID = req.params.adminID;
  verifyToken(req, res, (authData) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (authData === undefined) return res.send(403);
      pool.query(`SELECT warehouse_access FROM users WHERE dod_id = '${adminID}'`, (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        res.send(results.rows);
      });
    });
  });
};


module.exports = {
  adminWarehouses,
};