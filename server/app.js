const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'root',
  host: 'db', 
  database: 'postgres',
  password: 'root',
  port: '5432'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hey fucker!');
});