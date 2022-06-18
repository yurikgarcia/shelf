import React, { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SaveIcon from "@mui/icons-material/Save";
import shelfLogo from ".//Images/shelfLogo.png";
// import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";


/**
 *
 * settings for user drop down css`
 */
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

export default function CheckoutDrawer({ shoppingCart, setShoppingCart }) {

  const [newShoppingCart, setNewShoppingCart] = useState([]); //shopping cart state
  const [spinner, setSpinner] = useState(false); //spinner state

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
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 275 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></Box>
  );

  
  const [users, setUsers] = useState([]); //users state

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


// //fetch from shopping_cart table
//   const fetchShoppingCart = async () => {
//     setSpinner(true);
//     axios
//       .get("http://localhost:3000/shopping_cart", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authorization")}`,
//         },
//       })
//       .then((res) => {
//         setNewShoppingCart(res.data);
//         setSpinner(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setSpinner(false);
//       });
//   };



//   /**
//    * shopping Cart fetch
//    */
//   const fetchNewShoppingCart = async (params) => {
//     setSpinner(true);
//     console.log("fetching new shopping cart");
//     let newShoppingCart = params.row;
//     axios
//       .get("http://localhost:3000/shopping-cart", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authorization")}`
//         },
//       })
//       .then((res) => {
//         setNewShoppingCart(res.data);
//         setSpinner(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setSpinner(false);
//       });
//   };


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
          fetchNewShoppingCart();
        }
      })
      .catch((err) => {
        alert("Sorry! Something went wrong. Please try again.");
        console.log("err", err);
      });
  };

  const [value, setValue] = useState('');

  // console.log('newShoppingCart', newShoppingCart[0])
  // console.log('newShoppingCart-DODID', newShoppingCart[0].dod_id)
  // console.log('newShoppingCartDRILL', newShoppingCart[0].items[0])


  // console.log({ value });

  // console.log({items: newShoppingCart[0].items[0]})


  // console.log(shoppingCart)
  console.log("hellllp", newShoppingCart)
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

              {/* <ListItem
                disablePadding
                sx={{ display: "flex", mt: 2, flexDirection: "column" }}
              >
                {shoppingCart?.map((item, index) => {
                  return (
                    <div style={{ width: "100%" }} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          mt: 2,
                          ml: 3,
                          flexDirection: "row",
                          width: "1000",
                        }}
                      > */}
                        {/* <Box sx={{ width: 100 }}>
                          <p>{item.itemName}</p>
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
                          <ClearIcon fontSize="x-small" />
                        </Box> */}
                      {/* </Box>
                      <Divider sx={{ borderBottomWidth: 2 }} />
                    </div>
                  );
                })}
              </ListItem> */}


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
                  startIcon={<SaveIcon />}
                >
                  Checkout
                </Button>
              </ListItem>

              {/* <ListItem
                disablePadding
                sx={{ display: "flex", mt: 2, flexDirection: "column" }}
              >
                    {newShoppingCart?.map((item, index) => {
                      return (
                        <div style={{ width: "100%" }} key={index}>
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
                              <div>{newShoppingCart[0].items.map((items, index) => {
                                return (
                                  <div key={index}>
                      
                                
                                  </div>
                                )
                              })}</div>
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
                              <ClearIcon fontSize="x-small" />
                            </Box>
                          </Box>
                          <Divider sx={{ borderBottomWidth: 2 }} />
                        </div>
                      );
                    }
                    )}
                    
              </ListItem> */}

              {/* <ListItem>
                {users.map((users, index) => {
                  return (
                              <div key={index}>
                                {users.dod_id}
                              </div>
                            )
                          })}
              </ListItem> */}

              <ListItem>
                {newShoppingCart
                  ?.map((item, index) => {
                    return (
                      <div key={index}>
                          <Box sx={{ width: 100 }}>
                            <div>{newShoppingCart[0].items.map((items, index) => {
                              return (
                                <div key={index}>
                                  {items.Name}
                                </div>
                              )
                            })}</div>
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
                            <ClearIcon fontSize="x-small" />
                          </Box>
                    
                        <Divider sx={{ borderBottomWidth: 2 }} />
                      </div>
                    );
                  }
                  )}
              </ListItem>
            </List>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}