import * as React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem('authorization');
    window.location.href = '/login';
  }

  return (
    <div>

<AccountCircleIcon sx={{mt:1, ml:1, mr:1}} onClick={handleClick}></AccountCircleIcon>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Account</MenuItem> */}
        <Link to="/signup"style={{ textDecoration: 'none', color: 'black'}}> <MenuItem onClick={handleClose}>New Account</MenuItem></Link>
        <MenuItem style={{ textDecoration: 'none', color: 'black'}} onClick={(e) => (window.location = 'https://tinyurl.com/shelf-inventory')}>New Warehouse</MenuItem>
        <MenuItem style={{ textDecoration: 'none', color: 'black'}} onClick={(e) => (window.location = 'https://docs.google.com/forms/d/1voabKLs8gkcZ_EOAiHBHqY3kjhNzUDO-8TbXYQyJXOs/edit')}>Report An Issue</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}