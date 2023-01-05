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
      const user_id = req.params.dod;
      console.log("GET SEELECTED USERRRRRRRRRRRRRRRRRRRR", user_id)
      pool.query(`SELECT * FROM users WHERE dod_id = '${user_id}'`, (error, results) => {
        if (error) {
          return res.send("error" + error);
        }
        res.send(results.rows);
      });
}

// async function getSelectedUser(req, res) {
//   verifyToken(req, res, (authData) => {
//     jwt.verify(req.token, "secretkey", (err, authData) => {
//       if (authData === undefined) return res.send(403);
//       pool.query("SELECT * FROM users", (error, results) => {
//         if (error) {
//           res.send("error" + error);
//         }
//         res.send(results.rows);
//       });
//     });
//   });
// };



module.exports = {
  getSelectedUser,
};