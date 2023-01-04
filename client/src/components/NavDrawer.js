import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import AppContext from "./AppContext.js";
import { styled, useTheme } from "@mui/material/styles";
// import {alpha } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckoutDrawer from "./CheckoutDrawer.js";
// import PublicIcon from '@mui/icons-material/Public';
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import GroupIcon from '@mui/icons-material/Group';
// import InputBase from '@mui/material/InputBase';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from "@mui/material/IconButton";
import InventoryIcon from '@mui/icons-material/Inventory';
import InventoryMenu from "./InventoryMenu.js";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ProfileMenu from "./ProfileMenu.js";
import SidebarWarehouses from "./SidebarWarehouses.js";
import shelfLogo from './/Images/shelfLogo.png'
import Toolbar from "@mui/material/Toolbar";
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";



// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// -----------------search-------------
// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

// -----------------search-------------

const drawerWidth = 190

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

// necessary for content to be below app bar
const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: '#155E9C',
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function MiniDrawer({shoppingCart, setShoppingCart}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [adminWarehouses, setAdminWarehouses] = React.useState([]);//warehouses admin has access to

    const { API } = useContext(AppContext);

      //initial call to grab users from DB on load
      useEffect(() => {
        fetchLoggedAdminWarehouses();
      }, []);
  
        /**
     * fetches the logged in user's warehouses from the DB
     */
        const fetchLoggedAdminWarehouses = async () => {
          let adminID = localStorage.user_dod
          axios
          .get(`${API.website}/admin-warehouses/${adminID}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            },
          })
          .then((res) => {
            setAdminWarehouses(res.data);
          })
          .catch((err) => { 
            console.log(err);
          });
        };


  

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };


      
      

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const availableWarehouses = adminWarehouses?.map(warehouse => warehouse?.warehouse_access?.map(warehouses => {
    return warehouses
  }))

  const flatWarehouses = availableWarehouses?.flat()



  return (
      <Box sx={{ display: "flex", }}>
        <CssBaseline/>
        <AppBar position="relative" open={open}>
          <Toolbar>
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" })
              }}
            >
            <Tooltip title="Expand Sidebar" placement="right-end">
              <MenuIcon />
            </Tooltip>  
            </IconButton> */}

            <Box sx={{mr:2}}>
              <Link to="/home">
                <img alt="shelf logo" src={shelfLogo} width='35' height='35'/>
              </Link>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >

            <Link to="/home" style={{ textDecoration: 'none', color: 'white', fontSize: "30px"}}>
              Shelf
              </Link>
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", mr: 2}}
            > 
              {localStorage.user_name} 
            </Typography>

          
            <Link to="/home" style={{ textDecoration: 'none', color: 'white'}}>
              <Button sx={{mr:1}} variant="contained">Home</Button>
            </Link>


            {flatWarehouses[0] !== undefined ? (
            <Link to="/users"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Users</Button>
            </Link>
            ) : (
              null
            )}

            {/* <Link to="/users"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Users</Button>
            </Link> */}

            {/* <Link to="/inventory" style={{ textDecoration: 'none', color: 'white'}}>
              <Button sx={{mr:1}} variant="contained">Inventory</Button>
            </Link> */}

            {flatWarehouses[0] !== undefined ? (
            <InventoryMenu/>
            ) : (
              null
            )}

            {/* <Link to="/deploymentinventory"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Deployment</Button>
            </Link> */}


            {/* {flatWarehouses[0] !== undefined ? (
            <Link to="/orders2"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Orders</Button>
            </Link>
            ) : (
              null
            )} */}

            {/* {flatWarehouses[0] !== undefined ? (
            <Link to="/transfers"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Transfers</Button>
              
            </Link>
            ) : (
              null
            )} */}

            
         < NotificationsIcon
          onClick = {() => {
            window.location.href = "/transfers"
          }}
         /> 

            {/* <Link to="/login"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Login</Button>
            </Link> */}

            {/* <Link to="/signup"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Sign-Up</Button>
            </Link> */}

{/* 
            <Search sx={{mr:1}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
              
            </Search> */}
            <ProfileMenu/>

            {flatWarehouses[0] !== undefined ? (
            <CheckoutDrawer shoppingCart={shoppingCart}/> 
            ) : (
            null)}
            
          </Toolbar>
        </AppBar>


        <Drawer variant="permanent" open={open}>
          <DrawerHeader >
              <img alt="shelf logo" src={shelfLogo} width='30' height='30'/>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List >
              <Link to="/home" style={{ textDecoration: 'none', color: 'black'}}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                    <Tooltip title="Home" placement="right-end">
                      <   HomeIcon sx={{color: 'white', fontSize: '30px'}} />
                    </Tooltip>
                    </ListItemIcon>
                  <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
              </Link>

              {flatWarehouses[0] !== undefined ? (
                  <Link to="/users" style={{ textDecoration: 'none', color: 'black'}}>
                  <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                          < Tooltip title="Users" placement="right-end">              
                            <GroupIcon sx={{color: "white", fontSize: '30px'}} />
                          </Tooltip>
                          </ListItemIcon>
                          <ListItemText primary="Users" />
                        </ListItemButton>
                  </ListItem>
                </Link> 
              ) : (
                null
              )}



                {flatWarehouses[0] !== undefined ? (
                  <SidebarWarehouses/>
              ) : (
                null
              )}

              
              {/* <Link to="/deploymentinventory" style={{ textDecoration: 'none', color: 'black'}}>
                <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                        <Tooltip title="Deployment Gear" placement="right-end">
                          <PublicIcon sx={{color: 'white'}} />
                        </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Deployment" />
                      </ListItemButton>
                </ListItem>
              </Link>               */}



              {/* <Link to="/orders" style={{ textDecoration: 'none', color: 'black'}}>
                <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                        <Tooltip title="Orders" placement="right-end">
                          <MarkunreadMailboxIcon sx={{color: "white"}}   />
                        </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                      </ListItemButton>
                </ListItem>
              </Link>   */}


              {/* {flatWarehouses[0] !== undefined ? (
              <Link to="/orders2" style={{ textDecoration: 'none', color: 'black'}}>
              <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                      <Tooltip title="Orders" placement="right-end">
                        <LocalShippingIcon  sx={{color: "white", fontSize: '30px'}} />
                      </Tooltip>
                      </ListItemIcon>
                      <ListItemText primary="Users" />
                    </ListItemButton>
              </ListItem>
            </Link> 
              ) : (
                null
              )} */}

              {flatWarehouses[0] !== undefined ? (
              <Link to="/transfers" style={{ textDecoration: 'none', color: 'black'}}>
              <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                      <Tooltip title="Transfers" placement="right-end">
                        <LocalShippingIcon  sx={{color: "white", fontSize: '30px'}} />
                      </Tooltip>
                      </ListItemIcon>
                      <ListItemText primary="Users" />
                    </ListItemButton>
              </ListItem>
            </Link> 
              ) : (
                null
              )}             




          </List>
        </Drawer>
          <DrawerHeader />
      </Box>

  );
}