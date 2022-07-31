import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

export default function QuantityError() {

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


  const [openSnack, setOpenSnack] = React.useState(false);


  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
        setOpenSnack(false);
  };


  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpenSnack(true);
  };


  const [transition, setTransition] = React.useState(undefined)
  

  return (

    <div>
    {/* <Button 
      startIcon={<AddCircleIcon />}
      onClick={handleClick(TransitionLeft)}></Button> */}

      <AddCircleIcon
        onClick={handleClick(TransitionLeft)}
        />

    <Snackbar
        open={openSnack} 
        autoHideDuration={4000} 
        onClose={handleCloseSnack}
        TransitionComponent={transition}
        key={transition ? transition.name : ''}
        >
        <Alert sx={{ width: '1000%' }}>
          Your requested quantity exceeds the available count!
        </Alert>
    </Snackbar>
        </div>
  )
}



