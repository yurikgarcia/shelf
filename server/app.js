const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
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
  migrations: {
    tableName: "knex_migrations",
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.listen(PORT, () => {
  connectToDB();
  console.log(`listening on ${PORT}`);
});

app.get("/", (_, res) => {
  res.send("Hello welcome to Shelf!");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  let user = {
    email: req.body.user_email,
    password: req.body.user_password,
  };
  //query DB to verify user and password are correct
  pool.query(
    "SELECT * FROM users WHERE email = $1 AND user_password = $2",
    [user.email, user.password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        if (result.rows.length > 0) {
          //if user is found, create a token
          jwt.sign(
            { user },
            "secretkey",
            { expiresIn: "1hr" },
            (err, token) => {
              res.json({
                token,
              });
              console.log("token in app.js", token);
            }
          );
        }
      }
    }
  );
});

/// TESTING ROUTE ONLY //////
app.get("/testingJWT", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.send("idiot", err);
      console.log(err);
    } else {
      res.json({
        message: "it fucking worked bitch",
        authData,
      });
    }
  });
});
/// TESTING ROUTE ONLY //////

//--------------------------------INVENTORY TABLE----------------------------------------------------------------------------------------------------------------
/**
 * @returns all the rows from the Inventory Table
 */
app.get("/inventory", (_, res) => {
  pool.query("SELECT * FROM inventory", (error, results) => {
    if (error) {
      res.send("error" + error);
    }
    res.send(results.rows);
  });
});

/**
 * Adds new items to the inventory table
 */
app.post("/inventory", (req, res) => {
  pool.query(
    `INSERT INTO inventory (item_name, brand, nsn, item_size, gender, building, aisle, item_count, minimum_count, count_status, ordered, intial_gear, returnable_item, courier, tracking, contact) values('${req.body.item.item_name}', '${req.body.item.brand}', '${req.body.item.nsn}', '${req.body.item.item_size}', '${req.body.item.gender}', '${req.body.item.building}', '${req.body.item.aisle}', ${req.body.item.item_count}, ${req.body.item.minimum_count}, '${req.body.item.count_status}', ${req.body.item.ordered}, ${req.body.item.intial_gear}, ${req.body.item.returnable_item}, '${req.body.item.courier}', '${req.body.item.tracking}', '${req.body.item.contact}')`,
    (error, results) => {
      if (error) {
        res.send("error" + error);
      }
      console.log("placed in DB");
      res.status(200);
      res.send("Success");
    }
  );
});

/**
 * updates the inventory table with the new item matched at its ID
 */
app.patch("/inventory", (req, res) => {
  let params = {
    item_id: req.body.Delete,
    item_name: req.body.Name,
    brand: req.body.Brand,
    nsn: req.body.NSN,
    building: req.body.Bldg,
    aisle: req.body.Aisle,
    item_size: req.body.Size,
    item_count: req.body.Count,
    gender: req.body.Gender,
    initial_gear: req.body.Initial,
    minimum_count: req.body.MinCount,
    ordered: req.body.Ordered,
    returnable_item: req.body.Returnable,
    courier: req.body.Courier,
    tracking: req.body.Tracking,
    contact: req.body.Contact,
  };
  console.log(params);
  pool.query(
    `UPDATE inventory 
      SET item_name='${params.item_name}', brand='${params.brand}', nsn='${params.nsn}', item_size='${params.item_size}', gender='${params.gender}', building='${params.building}', aisle='${params.aisle}', item_count=${params.item_count}, minimum_count=${params.minimum_count}, count_status='${params.count_status}', ordered=${params.ordered}, intial_gear=${params.initial_gear}, returnable_item=${params.returnable_item}, courier='${params.courier}', tracking='${params.tracking}', contact='${params.contact}'
        WHERE item_id = '${params.item_id}'`,
    (error, results) => {
      if (error) {
        return res.send("error" + error);
      }
      console.log("updated in DB");
      res.status(204);
      res.send("Success");
    }
  );
});

/**
 * Deletes item from the inventory table
 */
app.delete("/inventory", (req, res) => {
  const item_id = req.body.id;
  pool.query(
    `DELETE FROM inventory WHERE item_id='${item_id}'`,
    (error, results) => {
      if (error) {
        res.send("error" + error);
      }
      console.log("removed from DB");
      res.status(200);
      res.send("Success");
    }
  );
});

//----------------------------------DEPLOYMENT TABLE--------------------------------------------------------------------------------------------------------------

/**
 *
 * @returns {Promise<void>}
 * getting deployment items
 */
// app.get('/deploymentinventory', (req, res) => {
//   pool.query('SELECT * FROM deployment', (error, results) => {
//     if (error) {
//       res.send('error' + error)
//     }
//     res.send(results.rows)
//   })
// })

async function connectToDB() {
  try {
    const client = await pool.connect();
    return console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
}

//--------------------------------USERS TABLE----------------------------------------------------------------------------------------------------------------
/**
 * @returns all the rows from the User Table
 */
app.get("/users", (_, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.send("error" + error);
    }
    res.send(results.rows);
  });
});

/**
 * Adds new users to the users table
 */
app.post("/users", (req, res) => {
  pool.query(
    `INSERT INTO users (dod_id, first_name, last_name, email) values('${req.body.users.dod_id}', '${req.body.users.first_name}', '${req.body.users.last_name}', '${req.body.users.email}')`,
    (error, results) => {
      if (error) {
        res.send("error" + error);
      }
      console.log("placed in DB");
      res.status(200);
      res.send("Success");
    }
  );
});

app.delete("/users", (req, res) => {
  const dod_id = req.body.id;
  pool.query(`DELETE FROM users WHERE dod_id='${dod_id}'`, (error, results) => {
    if (error) {
      res.send("error" + error);
    }
    console.log("removed from DB");
    res.status(200);
    res.send("Success");
  });
});

/**
 * updates the users table with the new item matched at its Dod ID
 */
app.patch("/users", (req, res) => {
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
});
//--------------------------------SHOPPING CART TABLE----------------------------------------------------------------------------------------------------------------
/**
 * returns
 */
app.get("/shopping-cart", (_, res) => {
  pool.query("SELECT * FROM shopping_cart", (error, results) => {
    if (error) {
      return res.send("error" + error);
    }
    res.send(results.rows);
  });
});

app.post("/shopping-cart", (req, res) => {
  //TODO: need to modify query to INSERT INTO shopping_cart (user_inv_id, dod_id, items) WHERE DODID matches the cart ID and then insert the items.
  //IDEA - add a cart ID under the users table to give each user a unique cart. (ya bitch, I mentioned it last week LMFAOOOOO)
  let inventoryId = Math.floor(Math.random() * 1000000) + 1;
  let dodId = Math.floor(Math.random() * 1000000) + 1;
  let params = {
    id: req.body.id,
    Delete: req.body.Delete,
    Edit: req.body.Edit,
    Name: req.body.Name,
    Brand: req.body.Brand,
    NSN: req.body.NSN,
    Bldg: req.body.Bldg,
    Size: req.body.Size,
    Count: req.body.Count,
    Gender: req.body.Gender,
    Aisle: req.body.Aisle,
    Initial: req.body.Initial,
    MinCount: req.body.MinCount,
    Ordered: req.body.Ordered,
    Returnable: req.body.Returnable,
  };
  pool.query(
    `INSERT INTO shopping_cart (user_inv_id, dod_id, items) 
  VALUES (
    '${inventoryId}',
    '${dodId}',
    array['{
      "id": "${params.id}",
      "Delete": "${params.Delete}",
      "Edit": "${params.Edit}",
      "Name": "${params.Name}",
      "Brand": "${params.Brand}",
      "NSN": "${params.NSN}",
      "Bldg": "${params.Bldg}",
      "Size": "${params.Size}",
      "Count": "${params.Count}",
      "Gender": "${params.Gender}",
      "Aisle": "${params.Aisle}",
      "Initial": "${params.Initial}",
      "MinCount": "${params.MinCount}",
      "Ordered": "${params.Ordered}",
      "Returnable": "${params.Returnable}"
    }']::json[])`,
    (error, results) => {
      if (error) {
        res.send("error" + error);
      }
      console.log("placed in DB");
      res.status(200);
    }
  );
});

//--------------------------------AUTH TOKEN CHECK FUNC----------------------------------------------------------------------------------------------------------------
// Authorization: Bearer <access_token> // Token Interface (JWT)

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"]; //checks the users token in the header
  if (typeof bearerHeader !== "undefined") {
    //if its not undefined then it splits the token at the first space and seperates the token from the bearer
    const bearer = bearerHeader.split(" "); // this is the split
    const bearerToken = bearer[1]; //grabs the next element in the array and sets it as the bearer token
    req.token = bearerToken; //sets the bearer token to the request
    next(); //built in function that allows the middleware to run
  } else {
    res.sendStatus(403); //sends a forbidden if there is no token
  }
}

/*
git pull origin
git checkout main
heroku git:remote -a postgres-apr
git push heroku main:main
*/
