import "./App.css";
import React, { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import Home from ".//components/Routes/Home.js";
import SignUp from ".//components/Routes/SignUp.js";
import Inventory from ".//components/Routes/Inventory.js";
import Login from ".//components/Routes/Login.js";
import Orders from ".//components/Routes/Orders.js";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Users from ".//components/Routes/Users.js";
import NavDrawer from "./components/NavDrawer";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1A73E8",
      light: "#5ca3f4",
      dark: "#004a90",
    },
    secondary: {
      main: "#1A73E8",
    },
  },
});

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    //used to test and remove token
    //console.log(localStorage.removeItem("authorization"))
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <header>
          <NavDrawer
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
          />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/inventory"
              element={
                <Inventory
                  shoppingCart={shoppingCart}
                  setShoppingCart={setShoppingCart}
                />
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}
export default App;
