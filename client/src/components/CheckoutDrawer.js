import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
// import { styled, useTheme } from "@mui/material/styles";
import SaveIcon from '@mui/icons-material/Save';
import shelfLogo from './shelfLogo.png'
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
// import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import { useColorScheme } from '@mui/material';

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



export default function CheckoutDrawer() {
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

  const theme = useTheme();
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
  const [spinner, setSpinner] = useState(false); //spinner state

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
        console.log(users)
      })
      .catch(err => {
        console.log(err);
        setSpinner(false);
      })
  };

  const [userListValue, setUserList] = useState({
    Delete: [],
  });

  const number = [1,2,3,4,5,6,7,8,9,10]

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title= 'Shopping Cart'>
            <ShoppingCartIcon  sx={{color:'black'}}  onClick={toggleDrawer(anchor, true)}>{anchor}</ShoppingCartIcon>
          </Tooltip>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <List>
              <ListItem sx={{ display: 'flex', justifyContent: 'center', mt: 5}}> 
                <img alt="shelf logo" src={shelfLogo} width='30' height='30'/>
                <h2>Shopping Cart</h2>
              </ListItem>
                <Divider/>
              <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center'}}> 
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
              <ListItem disablePadding sx={{ display: 'flex', ml:3, mt: 10}}> 
              <Box sx={{ minWidth: 105 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Qnty</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-multiple-name"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={MenuProps}
                    >
                      {number.map((number) => (
                          <MenuItem
                          key={number}
                          value={number}
                        >
                            {number} 
                          </MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </Box>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mt: 75 }}> 
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