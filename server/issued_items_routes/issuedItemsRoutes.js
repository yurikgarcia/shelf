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


async function getSelectedUser(req, res) {
console.log("GET SEELECTED USER", req.params.dod_id)
  verifyToken(req, res, (authData) => {
    console.log(authData);
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (authData === undefined) return res.send(403);
      let user_id = req.params.dod_id;
      pool.query(`SELECT * FROM users WHERE dod_id = '${user_id}'`, (error, results) => {
        if (error) {
          return res.send("error" + error);
        }
        res.send(results.rows);
      });
    });
  });
}



module.exports = {
  getSelectedUser,
};