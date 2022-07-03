import axios from 'axios';
import Box from '@mui/material/Box';
import React, {useState, useEffect } from 'react'
import UserItemsTable from "../Tables/UserItemsTable.js";
import { Route, Link, useMatch, matchPath, useLocation } from 'react-router-dom';



function UserDetails( ) {
  // const [spinner, setSpinner] = useState(false); //spinner state
  // const [user, setUser] = useState([]); //selected user state

  // useEffect(() => {
  //   fetchUsers2();
  //   if (localStorage.getItem("authorization") === null)
  //     window.location.href = "/login";
  // }, []);

  // const fetchUsers2 = async () => {
  //   setSpinner(true);
  //   axios.get('http://localhost:3000/issueditems',
  //   {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("authorization")}`,
  //     },
  //   })
  //     .then(res => {
  //       setUser(res.data);
  //       setSpinner(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setSpinner(false);
  //     })
  // };
  

  //React Router Dom hook used to pull the dod_id from the URL
  // const location = useLocation();


  // console.log("location", location);

  // console.log('selected', user);

        return (
          <main>  
            <Box sx={{ml: 15, mt: 2}}>
              <h1>Name of User Selected</h1>
            </Box>

            <Box sx={{ ml: 8, mt: 1 }}>
              <UserItemsTable />
              {/* {location.key} */}
            </Box>
          </main>  
          );
        }
      
export default UserDetails;