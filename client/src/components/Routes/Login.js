import React, { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import shelfLogo from '..//Images/shelfLogo.png'
import TextField from "@mui/material/TextField";

export default function SignUp() {
  const [user, setUser] = useState({
    user_email: "",
    user_password: "",
  });

  /**
   * verify if the user is logged in
   */
  const loginUser = async () => {
    axios
      .post("http://localhost:3000/login", {
        user_email: user.user_email,
        user_password: user.user_password,
      })
      .then((res) => {  
        if (res.status === 200) {
          console.log(res.data.token);
          const token = res.data.token;
          localStorage.setItem("authorization", token);
        }
      })
      .catch((err) => {
        alert("Sorry! Something went wrong. Please try again.");
        console.log("err", err);
      });
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", mt:12 }}>
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
              ml: 3,
              mt: 5,
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <Box>
                  <h1>LOGIN</h1>
                </Box>
                <Box sx={{ mt: 1000 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
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
            <Box sx={{ mt: 4 }}>
              <img alt="shelf logo" src={shelfLogo} width="250" height="250" />
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Box
            sx={{ display: "flex", justifyContent: "center", ml: 13, mb: 2 }}
          >
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              onClick={loginUser}
            >
              LOGIN!
            </Button>
          </Box>
          <Box sx={{ mb: 2 }}>
            <h5>Don't Have An Account?</h5>
          </Box>
          <Box sx={{ mb: 2.1 }}>
            <Link to="/signup" style={{ color: "#FC9A01" }}>
              <h5>Register For An Account</h5>
            </Link>
          </Box>
        </CardActions>
      </Card>
      </Box>
    </div>
  );
}
