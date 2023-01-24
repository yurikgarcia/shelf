//hello world

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const path = require('path');
const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
const { getSFSs6Inventory, addItemToSFSs6Inventory, updateItemInSFSs6Inventory, deleteItemFromSFSs6Inventory, } = require('./sfs_s6_inventory_routes/sfsS6_inventoryRoutes');
const { getSFSCapeInventory, addItemToSFSCapeInventory, updateItemInSFSCapeInventory, deleteItemFromSFSCapeInventory, } = require('./sfs_cape_inventory_routes/sfsCape_inventoryRoutes');
const { getSFSPatrickInventory, addItemToSFSPatrickInventory, updateItemInSFSPatrickInventory, deleteItemFromSFSPatrickInventory, } = require('./sfs_patrick_inventory_routes/sfsPatrick_inventoryRoutes');
const { getInventory, addItemToInventory, updateItemInInventory, deleteItemFromInventory } = require('./inventory_routes/inventoryRoutes');
const { updateItemCount } = require('./inventory_routes/inventoryCount');
const { removeItemFromCart } = require('./inventory_routes/removeItemFromCart');
const { addToItemCount } = require('./inventory_routes/inventoryAddCount');
const { addToSelectedWarehouse } = require('./inventory_routes/addToSelectedWarehouse');
const { itemCurrentCount, cartItemCount } = require('./inventory_routes/inventoryItemCount');
const { getUsers, addUser, deleteUser, updateUser,addAdmin} = require('./user_routes/userRoutes');
const { adminWarehouses } = require('./user_routes/admin_warehouses');
const { updateUserPermissions } = require('./user_routes/userPermissions');
const { updateUserPermissionsNull } = require('./user_routes/userPermissionsNull');
const { addToIssuedItems } = require('./user_routes/userInventory');
const { getSelectedUser } = require('./issued_items_routes/issuedItemsRoutes');
const { getCart, addToCart, deleteItemFromShoppingCart, addToCartFromUser, getCartColumn } = require('./shoppingcart_routes/shoppingcartRoutes');
const { updateQuantity } = require('./shoppingcart_routes/shoppingCartQuantity');
const { verifyToken, login } = require('./auth_routes/authRoutes');
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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
// app.use(express.static(path.join(__dirname, '../client/build'))); --this as well

//------------------------SERVER SETUP----------------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  connectToDB();
  console.log(`listening on ${PORT}`);
});


async function connectToDB() {
  try {
    await pool.connect();
    return console.log("Connected to Database");
  } catch (err) {
    console.log("Error Connecting to DB", err);
  };
};


// uncomment out to play @Garcia
app.get('/', (req,res) => {
  // res.sendFile(path.join(__dirname, '/client/build/index.html'));
  res.send(200);
});


// app.get('/test', (req, res) => {
//   res.send(`Test Successful ${PORT}, Bitchez!
//   ${JSON.stringify(pool)}
// `);
// })

app.get('/ELB-HealthChecker/2.0', (req, res) => {
  res.send(200);
})


//--------------------------------LOGIN AUTH----------------------------------------------------------------------------------------------------------------
app.post('/login', login)

//-------------------------------- DEMO INVENTORY TABLE----------------------------------------------------------------------------------------------------------------

app.get('/inventory', getInventory)
app.post('/inventory', addItemToInventory)
app.patch('/inventory', updateItemInInventory)
app.delete('/inventory', deleteItemFromInventory)

//-------------------------------- 45 SFS CAPE INVENTORY TABLE----------------------------------------------------------------------------------------------------------------

app.get('/45sfscapeinventory', getSFSCapeInventory)
app.post('/45sfscapeinventory', addItemToSFSCapeInventory)
app.patch('/45sfscapeinventory', updateItemInSFSCapeInventory)
app.delete('/45sfscapeinventory', deleteItemFromSFSCapeInventory)

//-------------------------------- 45 SFS PATRICK INVENTORY TABLE----------------------------------------------------------------------------------------------------------------

app.get('/45sfspatrickinventory', getSFSPatrickInventory)
app.post('/45sfspatrickinventory', addItemToSFSPatrickInventory)
app.patch('/45sfspatrickinventory', updateItemInSFSPatrickInventory)
app.delete('/45sfspatrickinventory', deleteItemFromSFSPatrickInventory)

//-------------------------------- 45 SFS S6 INVENTORY TABLE----------------------------------------------------------------------------------------------------------------

app.get('/45sfss6inventory', getSFSs6Inventory)
app.post('/45sfss6inventory', addItemToSFSs6Inventory)
app.patch('/45sfss6inventory', updateItemInSFSs6Inventory)
app.delete('/45sfss6inventory', deleteItemFromSFSs6Inventory)


//--------------------------------INVENTORY ITEM SUBTRACT FROM COUNT ----------------------------------------------------------------------------------------------------------------

app.patch('/inventorysubtractcount/:id/:newCount/:dod_id/:ogWarehouse', updateItemCount)

//--------------------------------REMOVE ITEM FROM CART ----------------------------------------------------------------------------------------------------------------

app.patch('/removeitemfromcart/:id/:dod_id', removeItemFromCart)

//--------------------------------INVENTORY ITEM ADD TO COUNT ----------------------------------------------------------------------------------------------------------------

app.patch('/inventoryaddcount/:id/:newCount/:user_dodid/:dod_id', addToItemCount)

//--------------------------------ISSUES ITEMS TO SELECTED WAREHOUSE ----------------------------------------------------------------------------------------------------------------

app.patch('/addToSelectedWarehouse/:selectedWarehouse/', addToSelectedWarehouse)


//--------------------------------USERS TABLE----------------------------------------------------------------------------------------------------------------

app.get('/users', getUsers)
app.post('/users', addUser)
app.delete('/users', deleteUser)  
app.patch('/users', updateUser)

//--------------------------------USERS TABLE ADD ADMIN----------------------------------------------------------------------------------------------------------------

app.post('/admins', addAdmin)

//--------------------------------USERS WAREHOUSE PERMISSIONS----------------------------------------------------------------------------------------------------------------

app.patch('/usersPermissions', updateUserPermissions)  

//--------------------------------USERS WAREHOUSE PERMISSIONS NULL----------------------------------------------------------------------------------------------------------------

app.patch('/usersPermissionsNull', updateUserPermissionsNull) 
//--------------------------------USERS ISSUED ITEMS ----------------------------------------------------------------------------------------------------------------//

app.get('/issueditems/:dod_id', getSelectedUser)
//--------------------------------SENDS CART TO ISSUED ITEMS----------------------------------------------------------------------------------------------------------------

app.patch('/issued-items/:id/:dod_id', addToIssuedItems)

//--------------------------------SHOPPING CART ----------------------------------------------------------------------------------------------------------------

app.get('/shopping-cart/:dod_id', getCart)
app.delete('/shopping-cart/:id/:dod_id', deleteItemFromShoppingCart)
app.patch('/shopping-cart/:dod_id/:current_date', addToCart)
app.patch('/shopping-cart/:dod_id', addToCartFromUser)

//--------------------------------SHOPPING CART - UPDATE QUANTITY----------------------------------------------------------------------------------------------------------------
app.patch('/shopping-cart-quantity/:id/:user_dod/:ogWarehouse', updateQuantity)

//--------------------------------SHOPPING CART - CURRENT COUNT----------------------------------------------------------------------------------------------------------------
app.get('/currentItemCount/:uuid/:ogWarehouse', itemCurrentCount)

//--------------------------------SHOPPING CART - CURRENT COUNT----------------------------------------------------------------------------------------------------------------
app.get('/cartItemCount/:uuid/:ogWarehouse', cartItemCount)

//--------------------------------WAREHOUSES----------------------------------------------------------------------------------------------------------------
app.get('/admin-warehouses/:adminID', adminWarehouses)

//--------------------------------ADMIN CART ----------------------------------------------------------------------------------------------------------------
app.get('/admin-cart/:adminID', getCartColumn)

//--------------------------------GET SELECTED USER FOR ISSUED ITEMS ----------------------------------------------------------------------------------------------------------------
app.get('/getselecteduser/:dod', getSelectedUser)






/*

heroku git:remote -a postgres-apr
git push heroku main:main
*/


/* 
 dont forget to install gulp globally from the thing I sent you in text
 uncomment out the commented out routes above
 To run the new playful items, cd into server, run the command gulp
 then run npm run dev
 navigate to the url of localhost:3000 and enjoy

 to test the build folder, youll need to install serve globally on your machine.
 in the client folder run npm run build
 the run serve build -p 3001
 click the link and test your build out.
      open the devtools and watch nertwrok traffic on login to see if its fetching correct data,
      same with viewing sources to see whats loaded. 


  you can also test the gulp build by cding into the prod-build/client and running serve build -p 3001


 to go to normal items, you can commewnt out the route of / and the static path. then just run nom run dev in the server, and npm start in the client.


 also try deleting the node_modules and the package-LOCKKKKKK file and running fresh installs to test changes
*/