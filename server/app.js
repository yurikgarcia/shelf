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

app.get('/', (req, res) => {
  res.send("Hey fucker's!");
});

app.get('/inventory', (req, res) => {
  pool.query('SELECT * FROM inventory', (error, results) => {
    if (error) {
      res.send('error' + error)
    }
    res.send(results.rows)
  })
})

async function connectToDB() {
  try {
    const client = await pool.connect();
    return console.log('connected to db');
  } catch (err) {
    console.log(err);
  }
};





