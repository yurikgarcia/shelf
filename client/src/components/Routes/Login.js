import React, { useState, useContext } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppContext from "../AppContext.js";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import shelfLogo from '..//Images/shelfLogo.png'
import TextField from "@mui/material/TextField";

export default function Login() {
  const [user, setUser] = useState({
    user_email: "",
    user_password: "",
    USER_warehouses: "",
  });

  const navigate = useNavigate();

  const goToUserDetails = (params) => {
    // console.log("PARAMS", params)
    let state = { First: params.user_first_name, Last: params.user_last_name, DoD: params.user_dod_id, Warehouses: params.USER_warehouses 
    }
    // console.log("PARAMS", params)
    // console.log("STATE FROM LOGIN", state)
    navigate('/issueditems', {state: state});
} 

const { API } = useContext(AppContext);
  

console.log("WEB", API.website)

  /**
   * verify if the user is logged in
   */
  //check to see if user.user_warehouse is not undefined and console.log"admin" if it is
  //if user.user_warehouse is undefined then console.log "user"
    const loginUser = async () => {
    axios
    .post(`${API.website}/login`, {
      // .post(`${API.website}/login`, {
        user_email: user.user_email,
        user_password: user.user_password,
        user_warehouses: user.user_password,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.token);
          const token = res.data.token;
          localStorage.setItem("authorization", token);
          const user = res.data.user;
          console.log("USER",user)
          // console.log("LENGTH", user.user_warehouses.length)
          localStorage.setItem("user_email", user.user_email);
          localStorage.setItem("user_first", user.user_first_name);
          localStorage.setItem("user_name", user.user_first_name + " " + user.user_last_name);
          localStorage.setItem("user_dod", user.user_dod_id);
          localStorage.setItem("USER_warehouses", user.user_warehouses);
          // let wareHouseLength = user.user_warehouses.length
          // console.log("USER ADMIN", wareHouseLength)
          // console.log("user.user_warehouses", user.user_first_name)
          // console.log("OKEN", res.data.user)
          console.log("TOKEN",token)
        }
        if(localStorage.getItem("authorization") !== undefined && res.data.user.USER_warehouses !== null ) window.location.href = "/home";
        else if(localStorage.getItem("authorization") !== undefined && res.data.user.USER_warehouses == null) goToUserDetails(res.data.user);
      })
      .catch((err) => {
        alert("Sorry! You are not authorized to access this page.");
        console.log("err", err);
      });
  };




  return (
  <body>
    <div
    className="fill-window"
    style={{
      backgroundColor: "#1A73E8", 
      height: "1000vh",
      width: "100vw",
    }}
    >
      <Grid container >
        <Grid item xs={12} m={6} l={6}>
      <Box sx={{ display: "flex", justifyContent: "center", mt:20, flexGrow: 1}}>
      <Card
        sx={{
         
          width: "80%",
          boxShadow: 19,
          borderRadius: "16px",
        }}
        variant="outlined"
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              ml: 3,
              mt: 5,
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <Box >
                  <h1>LOGIN</h1>
                </Box>
                <Box sx={{ mt: 1000, width:"1000" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", width:"1000" }}>
                    <AccountCircle
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      required={true}
                      id="input-with-sx"
                      label="User Name"
                      variant="standard"
                      onChange={(e) =>
                        setUser({ ...user, user_email: e.target.value })
                      }
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                    <TextField
                      required={true}
                      id="outlined-password-input"
                      type="password"
                      label="Password"
                      variant="standard"
                      onChange={(e) =>
                        setUser({ ...user, user_password: e.target.value })
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </div>
            <Box sx={{ mt: 5, display:"flex", justifyContent:"center", flexGrow: 1, width: '25px' }}>
              <img alt="shelf logo" src={shelfLogo} width="75%" height="100%" />
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Box sx={{
            display:'flex', 
            flexDirection: 'row', 
            justifyContent: 'center',
            width: '100%'
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center'}} >
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                onClick={loginUser}
              >
                LOGIN!
              </Button>
          </Box>
          <Box>
            <h5>Don't Have An Account?</h5>
          </Box>
          <Box>
            <Link to="/signup" style={{ color: "#FC9A01" }}>
              <h5>Register!</h5>
            </Link>
          </Box>
          </Box>
        </CardActions>
      </Card>

      </Box>
      </Grid>
      </Grid>
    </div>
    </body>
  );
}
