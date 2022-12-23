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