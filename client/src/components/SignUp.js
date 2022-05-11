import * as React from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import shelfLogo from './shelfLogo.png'
import TextField from "@mui/material/TextField";



const card = (
  <React.Fragment>
    <CardContent>
      <Box 
      sx={{ 
        display: "flex",       
        ml:3, 
        mt:5, 
        justifyContent: 'space-evenly',
        }}>      
        <div>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box>
              <h1>SIGN UP</h1>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              required={true} 
              id="input-with-sx" 
              label="Your First Name" 
              variant="standard" 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircleOutlinedIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              required={true} 
              id="input-with-sx" 
              label="Your Last Name"
              variant="standard"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <CreditCardOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              required={true} 
              id="input-with-sx" 
              label="Your DOD-ID" 
              variant="standard" 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              required={true} 
              id="input-with-sx" 
              label="Your E-mail" 
              variant="standard" 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LockIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField  
              required={true} 
              id="outlined-password-input" 
              type="password"
              label="Password" 
              variant="standard" 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LockOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              required={true} 
              type="password" 
              id="outlined-password-input" 
              label="Confirm Password" 
              variant="standard" 
              />
            </Box>
          </Box>
        </div>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 18 }}>
          <img alt="shelf logo" src={shelfLogo} width='250' height='250'/>
        </Box>
        
      </Box>
    </CardContent>
    <CardActions>
      <Box sx={{display: 'flex', justifyContent: 'center', ml:20, mb:2}}>
        <Button
          color="secondary"
          variant="contained"
          type="submit" 
        >
          REGISTER!
        </Button>                  
      </Box>
      <Box sx={{mb:2}}>
        <h5>Already Have An Account?</h5>
      </Box>
      <Box sx={{mb:2.1}}>
      <Link to="/login" style={{ color: '#FC9A01'}}>
        <h4>Login</h4>
      </Link>
      </Box>
    </CardActions>
  </React.Fragment>
);

export default function SignUp() {
  return (
    <div>
      <Box
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignContent: "center", 
          mt:10,
        }}
      >
        <Card 
        sx={{ 
        width: "700px", 
        boxShadow: 19, 
        borderRadius: "16px",
        }} 
        variant="outlined"
        >
          {card}
        </Card>
      </Box>
    </div>
  );
}
