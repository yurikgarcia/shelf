import React, { useState } from 'react';
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
import shelfLogo from '..//Images/shelfLogo.png'
import TextField from "@mui/material/TextField";


export default function SignUp() {

  const [newUser, setNewUser] = useState({
    dod_id: '',
    first_name: '',
    last_name: '',
    email: '',
    organization: '',
    password: '',
    password_verify:''
  })

  const [variant, setVariant] = useState({
    dod_id: 'false',
    first_name: 'false',
    last_name: 'false',
    email: 'false',
    organization: '',
    password: '',
    password_verify:''
  })

//function that sets variant to true if newUser.first_name has a value
  const variantSetter = (e) => {
    (newUser.first_name === '') ? setVariant({...variant, first_name: 'false'}) : setVariant({...variant, first_name: 'true'})
    }
    

  return (
    <div
    className="fill-window"
    style={{
      backgroundColor: "#1A73E8", 
      height: "1000vh",
      width: "100vw",
    }}
    >
      <Box
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignContent: "center", 
          mt:12,
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
              <h1>SIGN UP !</h1>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
                required={true} 
                error={variant.first_name}
                id="input-with-sx" 
                label="First Name" 
                variant="standard"
                onChange={(e) => {
                  setNewUser({ ...newUser, first_name: e.target.value });
                  setVariant({ ...variant, first_name: false });
                  }
                } 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircleOutlinedIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              required={true}
              error={variant.last_name}
              id="input-with-sx" 
              label="Last Name"
              variant="standard"
              onChange={(e) => {
                setNewUser({ ...newUser, last_name: e.target.value });
                setVariant({ ...variant, last_name: false });
                }
              } 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              required={true}
              error={variant.email} 
              id="input-with-sx" 
              label="E-mail" 
              variant="standard" 
              onChange={(e) => {
                setNewUser({ ...newUser, email: e.target.value });
                setVariant({ ...variant, email: false });
                }
              } 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <CreditCardOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              required={true}
              error={variant.dod_id} 
              id="input-with-sx" 
              label="DOD-ID" 
              variant="standard" 
              onChange={(e) => {
                setNewUser({ ...newUser, dod_id: e.target.value });
                setVariant({ ...variant, dod_id: false });
                }
              } 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LockIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField  
              required={true} 
              error={variant.password_verify}
              id="outlined-password-input" 
              type="password"
              label="Password" 
              variant="standard"
              onChange={(e) => {
                setNewUser({ ...newUser, password: e.target.value });
                }
              } 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LockOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              required={true} 
              error={variant.password_verify}
              type="password" 
              id="outlined-password-input" 
              label="Confirm Password" 
              variant="standard" 
              onChange={(e) => setNewUser({ ...newUser, password_verify: e.target.value })}
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
          {newUser.password !== newUser.password_verify ? (
            <Box sx={{display:"flex", flexDirection:"column"}}>
              <Box sx={{display: 'flex', justifyContent: 'center', ml:20, mb:2}}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit" 
                  onClick={() => {
                    setVariant({...variant, password: true})
                    setVariant({...variant, password_verify: true})
                  }}
                >
                 BAD!
                </Button>  
              {/* <h5>Passwords Do Not Match!</h5>     */}
            </Box>
          </Box>
            ) : (
              <Box sx={{display: 'flex', justifyContent: 'center', ml:20, mb:2}}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    setVariant({...variant, password: false})
                    setVariant({...variant, password_verify: false})
                  }}
                >
                  GOOD!
                </Button>                  
              </Box>
              )
            }
            <Box sx={{mb:2}}>
              <h5>Already Have An Account?</h5>
            </Box>
            <Box sx={{mb:2.1}}>
            <Link to="/login" style={{ color: '#FC9A01'}}>
              <h4>Login</h4>
            </Link>
            </Box>       
          </CardActions>
              </Card>
            </Box>
    </div>
  );
}
