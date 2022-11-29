import React, { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import homePage from '..//Images/homePage.jpg'
import WebFont from 'webfontloader';
import TextField from "@mui/material/TextField";





function Transfers() {

  const [value, setValue] = useState(''); //value state for users drop down
const [adminWarehouses, setAdminWarehouses] = React.useState([]);//warehouses admin has access to


  //initial calls
  useEffect(() => {
    fetchLoggedAdminWarehouses();
  }, []);

          /**
     * fetches the logged in user's warehouses from the DB
     */
           const fetchLoggedAdminWarehouses = async () => {
            let adminID = localStorage.user_dod
            axios
            .get(`http://localhost:3000/admin-warehouses/${adminID}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authorization")}`,
              },
            })
            .then((res) => {
              setAdminWarehouses(res.data);
            })
            .catch((err) => { 
              console.log(err);
            });
          };

const availableWarehouses = adminWarehouses?.map(warehouse => warehouse?.warehouse_access?.map(warehouses => {
  return warehouses
}))

const flatWarehouses = availableWarehouses.flat()

  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Arvo' ]
      }
    });
  }, []);

  // console.log("LOCAL STORAGE", localStorage)
  console.log("VALUE", value)
  
  return (
    <div>

          <Box sx={{ mt: 1, ml:15, fontSize: 50, height: '0%',}}>
            <div>
              <p>Incoming Transfers</p>
            </div>
          </Box>


      <Box sx={{ mt: 5, ml:15}}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={flatWarehouses}
          onChange={(event, newValue) => {
            setValue(newValue.Table);
          }}
          getOptionLabel={(option) => option.Name }
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Warehouses" variant="outlined" />
            )}
        />
      </Box>
    </div>
  );
}

export default Transfers;