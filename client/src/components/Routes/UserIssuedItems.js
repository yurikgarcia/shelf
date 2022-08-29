import axios from 'axios';
import Box from '@mui/material/Box';
import React, {useState, useEffect } from 'react'
import UserItemsTable from "../Tables/UserItemsTable.js";
import { useLocation } from 'react-router-dom';



function UserDetails( ) {

  const location = useLocation();//REact Router Hooked used to bring in the state of selected user and set the title of the page

        return (
          <main>  
            <Box sx={{ml: 15, mt: 2}}>
              <h1>{location.state.First} {location.state.Last}: Issued Items </h1>
            </Box>

            <Box sx={{ ml: 8, mt: 1 }}>
              <UserItemsTable />
              {/* {location.key} */}
            </Box>
          </main>  
          );
        }
      
export default UserDetails;