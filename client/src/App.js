import './App.css';
import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DeploymentGear from "./components/DeploymentGear";
import Home from "./components/Home.js";
import Inventory from "./components/Inventory.js";
import Orders from "./components/Orders.js";
import { Routes, Route } from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import Users from "./components/Users.js";
import NavDrawer from './components/NavDrawer';

const customTheme = createTheme ({
  palette: {
    primary: {
      main: '#1675C2',
      light: '#5ca3f4',
      dark: '#004a90'
    },
    secondary: {
      main: '#004a90',
    },
  },
});


function App() {
  return (
<ThemeProvider theme = {customTheme}> 
    <div>
      <header>
        <NavDrawer />
      </header>
      <main>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/deploymentinventory" element={<DeploymentGear/>} /> 
        <Route path="/inventory" element={<Inventory/>} /> 
        <Route path="/users" element={<Users />} /> 
        <Route path="/orders" element={<Orders />} /> 
      </Routes>
    </main>
  </div>
  </ThemeProvider>
  );
}
export default App;
