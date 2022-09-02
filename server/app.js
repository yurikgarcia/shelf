const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
const { getInventory, addItemToInventory, updateItemInInventory, deleteItemFromInventory } = require('./inventory_routes/inventoryRoutes');
const { updateItemCount } = require('./inventory_routes/inventoryCount');
const { addToItemCount } = require('./inventory_routes/inventoryAddCount');
const { itemCurrentCount } = require('./inventory_routes/inventoryItemCount');
const { getUsers, addUser, deleteUser, updateUser} = require('./user_routes/userRoutes');
const { adminWarehouses } = require('./user_routes/admin_warehouses');
const { addToIssuedItems } = require('./user_routes/userInventory');
const { getSelectedUser } = require('./issued_items_routes/issuedItemsRoutes');
const { getCart, addToCart, deleteItemFromShoppingCart, addToCartFromUser } = require('./shoppingcart_routes/shoppingcartRoutes');
const { updateQuantity } = require('./shoppingcart_routes/shoppingCartQuantity');
const { verifyToken, login } = require('./auth_routes/authRoutes');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//------------------------SERVER SETUP----------------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  connectToDB();
  console.log(`listening on ${PORT}`);
});

async function connectToDB() {
  try {
    const client = await pool.connect();
    return console.log("connected to db");
  } catch (err) {
    console.log(err);
  };
};

//--------------------------------LOGIN AUTH----------------------------------------------------------------------------------------------------------------
app.post('/login', login)

////// TESTING ROUTE ONLY //////
//line 52 - 57 will be added to all routes to verify auth token is in the header. 
// app.get("/testingJWT", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.send("idiot", err);
//       console.log(err);
//     } else {
//       res.json({
//         message: "it fucking worked bitch",
//         authData,
//       });
//     }
//   });
// });
/// TESTING ROUTE ONLY //////

//--------------------------------INVENTORY TABLE----------------------------------------------------------------------------------------------------------------

app.get('/inventory', getInventory)
app.post('/inventory', addItemToInventory)
app.patch('/inventory', updateItemInInventory)
app.delete('/inventory', deleteItemFromInventory)

//--------------------------------INVENTORY ITEM SUBTRACT FROM COUNT ----------------------------------------------------------------------------------------------------------------

app.patch('/inventorysubtractcount/:id/:newCount/:dod_id', updateItemCount)

//--------------------------------INVENTORY ITEM ADD TO COUNT ----------------------------------------------------------------------------------------------------------------

app.patch('/inventoryaddcount/:id/:newCount/:user_dodid/:dod_id', addToItemCount)



//--------------------------------USERS TABLE----------------------------------------------------------------------------------------------------------------

app.get('/users', getUsers)
app.post('/users', addUser)
app.delete('/users', deleteUser)
app.patch('/users', updateUser)
//--------------------------------USERS ISSUED ITEMS ----------------------------------------------------------------------------------------------------------------

// 
app.get('/issueditems/:dod_id', getSelectedUser)


//--------------------------------SENDS CART TO ISSUED ITEMS----------------------------------------------------------------------------------------------------------------

app.patch('/issued-items/:id/:dod_id', addToIssuedItems)


//--------------------------------SHOPPING CART ----------------------------------------------------------------------------------------------------------------

app.get('/shopping-cart/:dod_id', getCart)
app.delete('/shopping-cart/:id/:dod_id', deleteItemFromShoppingCart)
app.patch('/shopping-cart/:dod_id/:current_date', addToCart)
app.patch('/shopping-cart/:dod_id', addToCartFromUser)

//--------------------------------SHOPPING CART - UPDATE QUANTITY----------------------------------------------------------------------------------------------------------------
app.patch('/shopping-cart-quantity/:id/:user_dod', updateQuantity)

//--------------------------------SHOPPING CART - CURRENT COUNT----------------------------------------------------------------------------------------------------------------
app.get('/currentItemCount/:uuid', itemCurrentCount)

//--------------------------------SHOPPING CART - CURRENT COUNT----------------------------------------------------------------------------------------------------------------
app.get('/admin-warehouses/:adminID', adminWarehouses)



/*

heroku git:remote -a postgres-apr
git push heroku main:main
*/
