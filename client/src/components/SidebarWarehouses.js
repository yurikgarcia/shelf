import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link, useParams, useNavigate } from "react-router-dom";
import InventoryIcon from '@mui/icons-material/Inventory';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [adminWarehouses, setAdminWarehouses] = React.useState([]);//warehouses admin has access to
  const [selectedWarehouse, setSelectedWarehouse] = useState(''); //value state for users drop down


      //initial call to grab users from DB on load
      useEffect(() => {
        fetchLoggedAdminWarehouses();
        //breaks the app into a loop *****
        // if (localStorage.getItem("authorization") === null)
        //   window.location.href = "/login";
      }, []);
  
        /**
     * fetches the logged in user's warehouses from the DB
     */
        const fetchLoggedAdminWarehouses = async () => {
          let adminID = localStorage.user_dod
          axios
          .get(`http://localhost:3000/admin-warehouses/${adminID}`, {
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

        // console.log("selectedWarehouse!", selectedWarehouse);

        const navigate = useNavigate();

        const goToUserDetails = (params) => {
          navigate('/inventory', {state: {warehouse: selectedWarehouse}});
          console.log("STATE wAREHOUSE", selectedWarehouse)
        }



  return (
    <div>
      <InventoryIcon
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        onClick={handleClick}
        sx={{ml: 2, mt: 1, color: "white", fontSize: '30px'}}
      >
        Inventory
      </InventoryIcon>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {adminWarehouses?.map((warehouses, index) => {
              return (
                <div key={index}>
                {warehouses?.warehouse_access?.map((warehouse_access, index) => {
                  return (
                    <MenuItem key={index} 
                    onClick={(event, newValue) => {
                      setSelectedWarehouse(warehouse_access.Name);
                      // setTimeout(() => {
                      //   navigate('/inventory', {state: {warehouse: selectedWarehouse}})
                      // }, "500")
                      setTimeout(() => {
                        goToUserDetails();
                      }, "500")
                      handleClose();
                    }}
                    >
                      
                      <p>{warehouse_access.Name}</p>
                
                    </MenuItem>
                  )})}
                </div>
              )
            }
          )}
        </StyledMenu>
    </div>
  );
}