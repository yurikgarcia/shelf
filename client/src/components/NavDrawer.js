import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {alpha } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckoutDrawer from "./CheckoutDrawer.js";
// import PublicIcon from '@mui/icons-material/Public';
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import GroupIcon from '@mui/icons-material/Group';
import InputBase from '@mui/material/InputBase';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from "@mui/material/IconButton";
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ProfileMenu from "./ProfileMenu.js";
import SearchIcon from '@mui/icons-material/Search';
import shelfLogo from './/Images/shelfLogo.png'
import Toolbar from "@mui/material/Toolbar";
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

// -----------------search-------------
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
      <Box sx={{ display: "flex", }}>
        <CssBaseline/>
        <AppBar position="fixed" open={open}>
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
                <img alt="shelf logo" src={shelfLogo} width='30' height='30'/>
              </Link>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >

            <Link to="/home" style={{ textDecoration: 'none', color: 'white', size: "medium"}}>
              Shelf
              </Link>
            </Typography>

          
            <Link to="/home" style={{ textDecoration: 'none', color: 'white'}}>
              <Button sx={{mr:1}} variant="contained">Home</Button>
            </Link>

            <Link to="/users"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Users</Button>
            </Link>

            <Link to="/inventory" style={{ textDecoration: 'none', color: 'white'}}>
              <Button sx={{mr:1}} variant="contained">Inventory</Button>
            </Link>

            {/* <Link to="/deploymentinventory"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Deployment</Button>
            </Link> */}


            <Link to="/orders2"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Orders</Button>
            </Link>

            {/* <Link to="/login"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Login</Button>
            </Link> */}

            {/* <Link to="/signup"  style={{ textDecoration: 'none', color: 'white'}}>
              <Button  sx={{mr:1}} variant="contained">Sign-Up</Button>
            </Link> */}


            <Search sx={{mr:1}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
              
            </Search>
            <ProfileMenu/>
            <CheckoutDrawer shoppingCart={shoppingCart}/>   
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
              <Link to="/" style={{ textDecoration: 'none', color: 'black'}}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                    <Tooltip title="Home" placement="right-end">
                      <   HomeIcon sx={{color: 'white'}} />
                    </Tooltip>
                    </ListItemIcon>
                  <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link to="/users" style={{ textDecoration: 'none', color: 'black'}}>
                <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                        < Tooltip title="Users" placement="right-end">              
                          <GroupIcon sx={{color: "white"}}  />
                        </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                      </ListItemButton>
                </ListItem>
              </Link> 

              <Link to="/inventory" style={{ textDecoration: 'none', color: 'black'}}>
                <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                        <Tooltip title="Inventory" placement="right-end">
                          <InventoryIcon sx={{color: 'white'}} />
                        </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Inventory" />
                      </ListItemButton>
                </ListItem>
              </Link>   
              
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

              <Link to="/orders2" style={{ textDecoration: 'none', color: 'black'}}>
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
              </Link>  

          </List>
        </Drawer>
          <DrawerHeader />
      </Box>

  );
}