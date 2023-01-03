
import React, { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext.js";
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {useLocation } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import warehouse from "..//Images/warehouse.gif";




function Home() {

  const [currentShoppingCart, setCurrentShoppingCart] = useState([]); //shopping cart state
  const [spinner, setSpinner] = useState(false); //spinner state
  const [user, setUser] = useState([]); //selected user state
  // const location = useLocation(); //React Router Dom hook used to pull the dod_id from the URL
  // const selectedUserDodId = location.state.DoD //Pulling Dod ID from location to use as param for SQL calls
  const user_dod = localStorage.getItem("user_dod"); //Pulling Dod ID from local storage to use as param for SQL calls
  const [newShoppingCart, setNewShoppingCart] = useState([]); //shopping cart state
  const { API } = useContext(AppContext);





  return (
    <div>
   HELLLOOO

    </div>
  );
}

export default Home;