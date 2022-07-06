import axios from 'axios';
import Box from '@mui/material/Box';
import React, {useState, useEffect } from 'react'
import UserItemsTable from "../Tables/UserItemsTable.js";
import { Route, Link, useMatch, matchPath, useLocation } from 'react-router-dom';



function UserDetails( ) {
  // const [user, setUser] = useState([]); //selected user state



        return (
          <main>  
            <Box sx={{ml: 15, mt: 2}}>
              <h1>Name of User Selected</h1>
              {/* <p>{user[0].first_name}</p> */}
            </Box>

            <Box sx={{ ml: 8, mt: 1 }}>
              <UserItemsTable />

            </Box>
          </main>  
          );
        }
      
export default UserDetails;