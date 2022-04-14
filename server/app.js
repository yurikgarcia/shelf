const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: "2186051b48a3165382eec15ee08503781fccfa3ed750774221b847ef754986e1",
  port: process.env.PRT,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: {
    tableName: 'knex_migrations'
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.listen(PORT, () => {
  connectToDB();
  console.log(`listening on ${PORT}`);
});

app.get('/', (_, res) => {
  res.send("Hey fucker's!");
});
//--------------------------------INVENTORY TABLE----------------------------------------------------------------------------------------------------------------
/**
 * @returns all the rows from the Inventory Table
 */
app.get('/inventory', (_, res) => {
  pool.query('SELECT * FROM inventory', (error, results) => {
    if (error) {
      res.send('error' + error)
    }
    res.send(results.rows)
  });
});

/**
 * Adds new items to the inventory table
 */
app.post('/inventory', (req, res) => {
  pool.query(`INSERT INTO inventory (item_name, brand, nsn, item_size, gender, building, aisle, item_count, minimum_count, count_status, ordered, intial_gear, returnable_item) values('${req.body.item.item_name}', '${req.body.item.brand}', '${req.body.item.nsn}', '${req.body.item.item_size}', '${req.body.item.gender}', '${req.body.item.building}', '${req.body.item.aisle}', ${req.body.item.item_count}, ${req.body.item.minimum_count}, '${req.body.item.count_status}', ${req.body.item.ordered}, ${req.body.item.intial_gear}, ${req.body.item.returnable_item})`, (error, results) => {
    if (error) {
      res.send('error' + error)
    }
    console.log('placed in DB')
    res.status(200)
    res.send("Success")
  })
});

/**
 * Deletes item from the inventory table
 */
app.delete('/inventory', (req, res) => {
  const item_id = req.body.id;
  console.log(item_id);
  pool.query(`DELETE FROM inventory WHERE item_id='${item_id}'`,
    (error, results) => {
      if (error) {
        res.send('error' + error)
      }
    console.log('removed from DB')
    res.status(200)
    res.send("Success")
    })
})


//----------------------------------DEPLOYENT TABLE--------------------------------------------------------------------------------------------------------------

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
    return console.log('connected to db');
  } catch (err) {
    console.log(err);
  }
};





