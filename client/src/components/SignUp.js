import * as React from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import shelfLogo from './shelfLogo.png'
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";


const card = (
  <React.Fragment>
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "center", ml:3, mt:5, justifyContent: 'space-evenly'  }}>      
        <div>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField required={true} id="input-with-sx" label="Your Name" variant="standard" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <CreditCardOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField required={true} id="input-with-sx" label="Your DOD-ID" variant="standard" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField required={true} id="input-with-sx" label="Your E-mail" variant="standard" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <LockIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField  required={true} id="input-with-sx" label="Password" variant="standard" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <LockOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField required={true}  id="input-with-sx" label="Repeat Password" variant="standard" />
          </Box>
        </Box>
        </div>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
          <img alt="shelf logo" src={shelfLogo} width='200' height='200'/>
        </Box>
      </Box>
    </CardContent>
    <CardActions>
      <Box sx={{display: 'flex', justifyContent: 'center', ml:24}}>
        <Button
          color="secondary"
          variant="contained"
          type="submit" 
        >
          SUBMIT!
        </Button>
      </Box>
    </CardActions>
  </React.Fragment>
);

export default function SignUp() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignContent: "center", mt:10 }}
    >
      <Card sx={{ width: "700px" }} variant="outlined">
        {card}
      </Card>
    </Box>
  );
}
