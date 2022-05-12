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

async function getUsers(req, res) {
  verifyToken(req, res, (authData) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (authData === undefined) return res.send(403);
      pool.query("SELECT * FROM users", (error, results) => {
        if (error) {
          res.send("error" + error);
        }
        res.send(results.rows);
      });
    });
  });
};

async function addUser(req, res) {
  pool.query(
    `INSERT INTO users (dod_id, first_name, last_name, email) values('${req.body.users.dod_id}', '${req.body.users.first_name}', '${req.body.users.last_name}', '${req.body.users.email}')`,
    (error, results) => {
      if (error) {
        return res.send("error" + error);
      }
      console.log("placed in DB");
      res.status(200);
      res.send("Success");
    }
  );
};

async function deleteUser(req, res) {
  const dod_id = req.body.id;
  pool.query(`DELETE FROM users WHERE dod_id='${dod_id}'`, (error, results) => {
    if (error) {
      res.send("error" + error);
    }
    console.log("removed from DB");
    res.status(200);
    res.send("Success");
  });
};

async function updateUser(req, res) {
  let params = {
    dod_id: req.body.DoD,
    first_name: req.body.First,
    last_name: req.body.Last,
    email: req.body.Email,
  };
  pool.query(
    `UPDATE users
          SET dod_id='${params.dod_id}', first_name='${params.first_name}', last_name='${params.last_name}', email='${params.email}'
          WHERE dod_id = '${params.dod_id}'`,
    (error, results) => {
      if (error) {
        return res.send("error" + error);
      }
      console.log("updated in DB");
      res.status(204);
      res.send("Success");
    }
  );
}

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
};
