import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddUsers from "..//Buttons/AddUsers.js";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Home() {


      //SNACKBAR ALERT
      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      
    
        const [openSnack, setOpenSnack] = React.useState(false);
      
        const handleSnack = () => {
          setOpenSnack(true);
        };
      
        const handleCloseSnack = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
      
          setOpenSnack(false);
        };


        const [snackState, setSnackState] = React.useState({
          open: false,
          vertical: 'bottom',
          horizontal: 'right',
        });
      
        const { vertical, horizontal, open } = snackState;
      
        const handleClick = (newSnackState) => () => {
          setSnackState({ open: true, ...newSnackState });
        };
      
        const handleClose = () => {
          setSnackState({ ...snackState, open: false });
        };


  
  return (
    <div>
      <Box sx={{ ml: 15, mt: 2 }}>
        <div>
          <h1>Welcome to Shelf!</h1>
        </div>
        <Button variant="outlined" onClick={handleSnack}>
      Open success snackbar
    </Button>

    <Snackbar open={openSnack} autoHideDuration={5000} onClose={handleCloseSnack}>
        <Alert onCloseSnack={handleCloseSnack} sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      </Box>
    </div>
  );
}

export default Home;
