import React, { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SaveIcon from "@mui/icons-material/Save";
import shelfLogo from ".//Images/shelfLogo.png";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";



export default function CheckoutDrawer({ shoppingCart, setShoppingCart, inventory, fetchInventory, }) {

  const [newShoppingCart, setNewShoppingCart] = useState([]); //shopping cart state
  const [spinner, setSpinner] = useState(false); //spinner state
  const [users, setUsers] = useState([]); //users state for list of users in drop down
  const [value, setValue] = useState(''); //value state for users drop down

  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  }; //drawer for the shopping cart

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 275 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></Box>
  );

  

  //initial call to grab users from DB on load
  useEffect(() => {
    fetchUsers();
    //breaks the app into a loop *****
    // if (localStorage.getItem("authorization") === null)
    //   window.location.href = "/login";
  }, []);


  /**
   * @returns users
   * fetches DB after any changes to the resutls array from the user on the front end
   */
  const fetchUsers = async () => {
    setSpinner(true);
    axios
      .get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
      });
  };


  //initial call to grab inventory from DB on load
  useEffect(() => {
    fetchNewShoppingCart();
    console.log("shoppingCart",shoppingCart)
  }, []);

  /**
   * shopping Cart fetch
   */
  const fetchNewShoppingCart = async () => {
    // setSpinner(true);
    axios
      .get("http://localhost:3000/shopping-cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
      })
      .then((res) => {
        setNewShoppingCart(res.data);
        // setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        // setSpinner(false);
      });
  };
  

  const [addedItem, setAddedItem] = useState({
    user_inv_id: "",
    dod_id: "",
    items: "",
  });

  /**
   * adds to shopping cart
   */

  const addItemToShoppingCart = async () => {
    const newInventory = addedItem;
    axios
      .post("http://localhost:3000/shopping-cart", { item: newShoppingCart })
      .then((res) => {
        if (res.status === 200) {
          setNewShoppingCart([...newShoppingCart, newShoppingCart]);
        }
      })
      .then(()=> { fetchNewShoppingCart()})
      .catch((err) => {
        alert("Sorry! Something went wrong. Please try again.");
        console.log("err", err);
      });
  };



  const onDelete  = async (items, index) => {
    console.log("item from front end going to db", items.UUID);
    let id = items.UUID;
    axios.delete(`http://localhost:3000/shopping-cart/${id}`)
      .then((res) => {
        if (res.status === 200) {
          fetchNewShoppingCart();
        }
      })
      .catch((err) => {
        alert("Sorry! Something went wrong. Please try again.");
        console.log("err", err);
      });
  };



  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Shopping Cart">
            {shoppingCart.length >= 1 ? (
              <ShoppingCartIcon
                sx={{ color: "#4CAF50" }}
                onClick={toggleDrawer(anchor, true)}
              >
                {anchor}
              </ShoppingCartIcon>
            ) : (
              <ShoppingCartIcon
                sx={{ color: "white" }}
                onClick={toggleDrawer(anchor, true)}
              >
                {anchor}
              </ShoppingCartIcon>
            )}
          </Tooltip>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <List>
              <ListItem
                sx={{ display: "flex", justifyContent: "center", mt: 7 }}
              >
                <img alt="shelf logo" src={shelfLogo} width="30" height="30" />
                <h2>Shopping Cart</h2>
              </ListItem>
              <Divider
                sx={{ mt: 2, bgcolor: "#155E9C", borderBottomWidth: 3 }}
              />


            <ListItem>
              {newShoppingCart.map((item, index) => {
                return (
                <div key={index}>
                  {item.items?.map((items, index) => {
                    return (
                      <div key={index}>
                        <Box
                          sx={{
                            display: "flex",
                            mt: 2,
                            ml: 3,
                            flexDirection: "row",
                            width: "1000",
                          }}
                        >
                          <Box sx={{ width: 100 }}>
                            <p>{items.Name}</p>
                          
                          </Box>
                          <Box>
                            <TextField
                              required
                              id="filled"
                              variant="outlined"
                              label="Quantity"
                              type="number"
                              defaultValue=""
                              style={{ width: 95, height: 80 }}
                              sx={{ ml: 2 }}
                              // sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                              // onChange={(e) => setNewValue({ ...newValue, Count: e.target.value })}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignContent: "center",
                              ml: 6,
                            }}
                          >
                            <ClearIcon fontSize="x-small" onClick={() => onDelete(items, index)} />
                          </Box>
                        </Box>
                      </div>
                    )}
                  )}
                </div>
                )}
              )}
              </ListItem>

              <ListItem>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={users}
                  onChange={(event, newValue) => {
                  setValue(newValue.dod_id);
                }}
                  getOptionLabel={(option) => option.first_name + " " + option.last_name}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                        <TextField {...params} label="Users" variant="outlined" />
                      )}
                  />
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              >
                <Button
                  color="secondary"
                  variant="contained"
                  box-sizing="medium"
                  startIcon={<SaveIcon/>}
                >
                  Checkout
                </Button>
              </ListItem>

            </List>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}