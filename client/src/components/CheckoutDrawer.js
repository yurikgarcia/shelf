import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import Badge from '@mui/material/Badge';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MuiAlert from '@mui/material/Alert';
import QuantityError from ".//Buttons/quantityError.js";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import shelfLogo from ".//Images/shelfLogo.png";
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";




export default function CheckoutDrawer({ shoppingCart, setShoppingCart, inventory, fetchInventory}) {
  const user_dod = localStorage.getItem("user_dod");
  const [newShoppingCart, setNewShoppingCart] = useState([]); //shopping cart state
  const [users, setUsers] = useState([]); //users state for list of users in drop down
  const [value, setValue] = useState(''); //value state for users drop down
  const [radioValue, setRadioValue] = React.useState('');//value state of radio button selection

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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 390 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></Box>
  );



  //initial call to grab users from DB on load
  useEffect(() => {
    fetchUsers();
    fetchNewShoppingCart();
    //breaks the app into a loop *****
    // if (localStorage.getItem("authorization") === null)
    //   window.location.href = "/login";
  }, []);


  /**
   * @returns users
   * fetches DB after any changes to the resutls array from the user on the front end
   */
  const fetchUsers = async () => {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //initial call to grab inventory from DB on load
  useEffect(() => {
    fetchUsers();
    fetchNewShoppingCart();
  }, []);

  /**
   * shopping Cart fetch
   */
  const fetchNewShoppingCart = async () => {
    // setSpinner(true);
    axios
    .get(`http://localhost:3000/shopping-cart/${user_dod}`, {
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
  


  // function to delete item from shopping_cart column in the users table in db
  const onDelete  = async (items, index) => {
    let id = items.UUID;
    axios.delete(`http://localhost:3000/shopping-cart/${id}/${user_dod}`)
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

  // function that takes the json array of shopping_cart and
  // adds the array to issued_items to the selected user (value = dod_id) then clears the cart


  const addToIssuedItems = async () => {
    axios
      .patch(`http://localhost:3000/issued-items/${user_dod}/${value}`,)
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

    const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
      },
    }));

  // function that checks for the amount of objects in the shopping cart in order to display the badge
  const cartLength = newShoppingCart.map(item => item.shopping_cart?.length)

  const handleChange = (event) => {
    setRadioValue(event.target.value);
  };



const warehouses = [ "45 SFS - Patrick Supply", "45 SFS - Cape Supply"]// hard coded warehouse for warehouse autocomplete

//initial state for updating the Quantity of a requested item in the cart
const [newQuantity, setNewQuantity] = useState({ 
  Quantity: " ",
  Count: " ",
  UUID: " ",
});


// const [subtractCount, setSubtractCount] = useState(newQuantity.Count - newQuantity.Quantity);//initial state for subtracting Quantity from Count of a requested item in the cart



//Change quantity of item in shopping cart

// const changeItemQuantity = async (items, index) => {
//   let id = items.UUID;
//   console.log("nNEWQTY", newQuantity.Quantity)
//   if (newQuantity.Quantity !== undefined || newQuantity.Quantity !== null || newQuantity.Quantity !== "") {
//   axios
//     .patch(`http://localhost:3000/shopping-cart-quantity/${id}/${user_dod}`,
//     newQuantity, 
//     )
//     .then((res) => {
//       if (res.status === 200) {
//         fetchNewShoppingCart();
//       }
//     })
//     .catch((err) => {
//       alert("Sorry! Something went wrong. Please try again.");
//       console.log("err", err);
//     });
//   } 
// }

const changeItemQuantity = async (items, index) => {
  let id = items.UUID;
  console.log("nNEWQTY", newQuantity.Quantity)
  axios
    .patch(`http://localhost:3000/shopping-cart-quantity/${id}/${user_dod}`,
    newQuantity, 
    )
    .then((res) => {
      if (res.status === 200) {
        fetchNewShoppingCart();
      }
    })
    .catch((err) => {
      alert("Sorry! Something went wrong. Please try again.");
      console.log("err", err);
    });

}



  //Change count of item in th inventory after the requested quantity is submitted in the cart
  const subtractFromInventory = async (items, index) => {
    let id = newQuantity.UUID;
    let newCount = newQuantity.Count-newQuantity.Quantity;
    axios
      .patch(`http://localhost:3000/inventorysubtractcount/${id}/${newCount}/${user_dod}`,
      newQuantity, 
      )
      .then((res) => {
        if (res.status === 200) {
          fetchNewShoppingCart();
          fetchInventory();
        }
      })
      .catch((err) => {
        alert("Sorry! Something went wrong. Please try again.");
        console.log("err", err);
      });
    };

      //Change count of item in th inventory after the requested quantity is submitted in the cart
  const addToInventoryCount = async (items, index) => {
    let id = newQuantity.UUID;
    let count = newQuantity.Count;
    let quantity = newQuantity.Quantity
    let newCount = +count + +quantity;
    axios
      .patch(`http://localhost:3000/inventoryaddcount/${id}/${newCount}/${user_dod}`,
      newQuantity, 
      )
      .then((res) => {
        if (res.status === 200) {
          fetchNewShoppingCart();
          // fetchInventory(); 
        }
      })
      .catch((err) => {
        alert("Sorry! Something went wrong. Please try again.");
        console.log("err", err);
      });
    }



    const [openSnack, setOpenSnack] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    
  
      function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
      }
    
      const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
            setOpenSnack(false);
      };


      // const handleClick = (Transition) => () => {
      //   setTransition(() => Transition);
      //   setOpenSnack(true);
      // };

      const handleClick = () => () => {
        setOpenSnack(true);
      };
    

    console.log("radio", radioValue);

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Shopping Cart">
            {cartLength >= 1 ? (
              <StyledBadge badgeContent={cartLength}>
                <ShoppingCartIcon
                  onClick={toggleDrawer(anchor, true)}
                >
                  {anchor}
                </ShoppingCartIcon>
              </StyledBadge>
            ) : (
              <ShoppingCartIcon
                sx={{ color: "white", mt:1 }}
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
            sx= {{ width: "500px" }}
          >
            {list(anchor)}
            <List>
              <ListItem
                sx={{ display: "flex", justifyContent: "center", mt: 7 }}
              >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ mt:3 }}>
                  <img alt="shelf logo" src={shelfLogo} width="40" height="40" />
                </Box>
                <Box sx={{ ml:1, fontSize: 19 }}>
                  <h2>Shopping Cart</h2>
                </Box>
                {/* <Box>
                <QuantityError/>
                </Box> */}
              </Box>
              </ListItem>

              <Divider
                sx={{ mt: 1.5, bgcolor: "#155E9C", borderBottomWidth: 3 }}
              />

            <ListItem>
              {newShoppingCart.map((item, index) => {
                return (
                  <div key={index}>
                {item.shopping_cart?.map((items, index) => {
                  return (
                    <div key={index}>
                    {cartLength >= 1 ? (
                    <Box
                        sx={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                        <Box
                          sx={{
                            display: "flex",
                            mt: 2,
                            ml: 3,
                            flexDirection: "column",
                            width: "1000",
                          }}
                        >
                          <Box sx={{display:'flex', flexDirection: "row"}}>
                            <Box>
                              <Box sx={{ width: 100, fontSize: '15px', height: 45}}>
                                <p>{items.Name}</p>
                              </Box>
                              <Box sx={{  fontStyle: 'italic', fontSize: '14px' }}> 
                                Size : {items.Size}
                              </Box>
                            </Box>

                            <Box>
                          
                            <TextField
                              required
                              id="filled"
                              variant="outlined"
                              label="Quantity"
                              type="number"              
                              // defaultValue={items.Quantity}
                              defaultValue= "0"
                              InputProps={{
                                inputProps: { 
                                    min: 0, 
                                    max: items.Count,
                                }
                            }}
                              style={{ width: 95, height: 60 }}
                              sx={{ ml: 2 }}
                              onChange={(e) => 
                                {if (e.target.value === "" || e.target.value === null || e.target.value === undefined || e.target.value < 0) {
                                  setNewQuantity({ ...newQuantity, Quantity: 0, Count: items.Count, UUID: items.UUID })                
                              } else {
                                {if (e.target.value !== "" || e.target.value !== null || e.target.value !== undefined && e.target.value > 0) {
                                      setNewQuantity({ ...newQuantity, Quantity: e.target.value, Count: items.Count, UUID: items.UUID })
                                      }}}}}
                              onBlur={() => { changeItemQuantity(items, index)}}
                            />

                              {window.location.href === "http://localhost:3001/inventory" ? (
                            <Box sx={{ ml:2, fontStyle: 'italic', fontSize: '13px' }}> 
                                Available: {items.Count}
                            </Box>) : window.location.href === "http://localhost:3001/issueditems" && items.Quantity !== undefined ?  (
                            <Box sx={{ ml:2, fontStyle: 'italic', fontSize: '13px' }}> 
                                Available: {items.Quantity}
                            </Box>
                            ) : null}
                            </Box>
                          
                            <Box
                              sx={{
                                display: "flex",
                                alignContent: "center",
                                ml: 6,
                              }}
                            >
                              <ClearIcon fontSize="x-small" 
                              onClick={() => {
                                onDelete(items, index)
                                // window.location.reload()
                              }}
                              />
                            </Box>
                          </Box>
                        
                              <Divider sx={{ mt: 2, bgcolor: "#155E9C", borderBottomWidth: 3 }}/>
                            </Box>
                          </Box>
                          ) : null}
                          </div>
                          )})}
                        </div>  
                        )})}
            </ListItem>

              <ListItem
              sx={{ display: "flex", flexDirection: "column"}}
              >
                {cartLength >= 1 ? (
                <Box
                
                >
                  <FormControl sx={{ mt:2 }}>
                    <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel value="Issue To User" control={<Radio />} label="Issue To User" />
                      {/* <FormControlLabel value="Issue To Warehouse" control={<Radio />} label="Issue To Warehouse" /> */}
                        <FormControlLabel value="Return To Warehouse" control={<Radio />} label="Return To Warehouse" />
                      </RadioGroup>
                  </FormControl>

                  
                  {radioValue === "Issue To User" ? (
                    <Box>
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
                    <Box sx={{mt:2, display: "flex", justifyContent: "center"}}>
                      <Button
                        variant="contained"
                        color="primary"
                        size= "large"
                        onClick={() => {
                          addToIssuedItems();
                          subtractFromInventory();
                          // window.location.reload()
                          // handleClick();
                          }
                        }
                      >
                        Checkout
                      </Button>
                    </Box>
                  </Box>
                  ) : radioValue === "Return To Warehouse" ? (
                    <Box>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={warehouses}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Warehouses" />}
                        onChange={(event, newValue) => {
                          // setValue(newValue.dod_id);
                          setValue('inventory')
                        }}
                      />
                    <Box sx={{mt:2, display: "flex", justifyContent: "center"}}>
                        <Button
                          variant="contained"
                          color="primary"
                          size= "large"
                          onClick={() => {
                            addToInventoryCount ();
                            }
                          }
                        >
                          Checkout
                        </Button>
                      </Box>
                  </Box>
                  ) : null}
                </Box>
                ) : 
                <div>
                  <Box sx={{mt: 10}}>
                    <Box sx={{ml: 5}}>
                      Your cart is currently empty.
                    </Box>
                    <Box>
                      Add to the cart to issue or return items.
                    </Box>
                  </Box>
                </div>
                }
              </ListItem>
            </List>
          </Drawer> 
        </React.Fragment>    
      ))}
    </div>
  );
}

                



