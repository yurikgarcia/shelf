import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SaveIcon from '@mui/icons-material/Save';
import shelfLogo from './shelfLogo.png'
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import TextField from "@mui/material/TextField";




  /**
   * 
   * settings for user drop down css`
   */
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function CheckoutDrawer({shoppingCart, setShoppingCart} ) {

  const [newShoppingCart, setNewShoppingCart] = useState([]); //shopping cart state
  const [spinner, setSpinner] = useState(false); //spinner state

  const [state, setState] = React.useState({
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 275 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    </Box>
  );


  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [users, setUsers] = useState([]); //users state


  //initial call to grab users from DB on load
  useEffect(() => {
    fetchUsers();
  }, []);


  /**
   * @returns users
   * fetches DB after any changes to the resutls array from the user on the front end
   */
  const fetchUsers = async () => {
    setSpinner(true);
    axios.get('http://localhost:3000/users')
      .then(res => {
        setUsers(res.data);
        setSpinner(false);
      })
      .catch(err => {
        console.log(err);
        setSpinner(false);
      })
  };

  const [userListValue, setUserList] = useState({
    Delete: [],
  });

  /**
   * 
   * number array for quantity drop down
   */
  const number = [1,2,3,4,5,6,7,8,9,10]




/**
 * shopping Cart fetch
 */
  const fetchNewShoppingCart = async () => {
    setSpinner(true);
    axios.get('http://localhost:3000/shopping-cart')
      .then(res => {
        setNewShoppingCart(res.data);
        setSpinner(false);
      })
      .catch(err => {
        console.log(err);
        setSpinner(false);
      })
  };
  
  const [addedItem, setAddedItem] = useState ({
    user_inv_id: '',
    dod_id: '',
    ietms: ''
  })
/**
 * adds to shopping cart
 */

 const addItemToShoppingCart = async () => {
  const newInventory = addedItem;
  axios.post('http://localhost:3000/shopping-cart', { item: newShoppingCart })
    .then(res => {
      if (res.status === 200) {
        setNewShoppingCart([...newShoppingCart, newShoppingCart])
        fetchNewShoppingCart()
      }
    })
    .catch(err => {
      alert('Sorry! Something went wrong. Please try again.')
      console.log('err', err);
    })
};

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title= 'Shopping Cart'>
            {shoppingCart.length >= 1 ? (
                      
                          <ShoppingCartIcon  sx={{ color: "#4CAF50" }}  onClick={toggleDrawer(anchor, true)}>{anchor}</ShoppingCartIcon>
                        ) : (
                          <ShoppingCartIcon  sx={{ color: "white" }} onClick={toggleDrawer(anchor, true)}>{anchor}</ShoppingCartIcon>
                          )}
          </Tooltip>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <List>
              <ListItem sx={{ display: 'flex', justifyContent: 'center', mt: 7}}> 
                <img alt="shelf logo" src={shelfLogo} width='30' height='30'/>
                <h2>Shopping Cart</h2>
              </ListItem>
                <Divider sx={{mt:2, bgcolor: "#155E9C", borderBottomWidth: 3 }}/>




              <ListItem disablePadding sx={{ display: 'flex', mt: 2, flexDirection: 'column'}}> 
                    {shoppingCart?.map((item, index) => {
                return (
              <div style={{"width" : "100%"}} key={index}>
                <Box sx={{display:'flex', mt:2, ml: 3, flexDirection:'row', width:'1000'}}>
                  <Box sx= {{width: 100}}>
                    <p>{item.itemName}</p>
                  </Box>
                  <Box>
                    <TextField
                      required
                      id="filled"
                      variant="outlined"
                      label="Quantity"
                      type="number"
                      defaultValue=''
                      style = {{width: 95, height: 80}}
                      sx={{ml:2}}
                            // sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                            // onChange={(e) => setNewValue({ ...newValue, Count: e.target.value })}
                          />
                  </Box>
                  <Box sx={{display:'flex', alignContent:'center', ml:6}}>
                    <ClearIcon fontSize="x-small"/>
                  </Box>
                </Box>
                <Divider sx={{borderBottomWidth: 2, }}/>     
            </div>
                );
              })}
            </ListItem>     

            <Divider sx={{mt:2, borderBottomWidth: 3, bgcolor: "#155E9C" }}/>  
            <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center', mt:2}}> 
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={MenuProps}
                    >
                      {users.map((users) => (
                          <MenuItem
                          key={users.dod_id}
                          value={users.dod_id}
                        >
                    {users.first_name} {users.last_name}
                          </MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </ListItem>
                <Divider sx={{mt:2, bgcolor: "#155E9C", borderBottomWidth: 3 }}/>
                  <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center', mt:2}}> 
                    <Button color='secondary' variant="contained" box-sizing="medium" startIcon={<SaveIcon />} >
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