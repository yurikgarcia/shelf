import axios from 'axios';
import Box from '@mui/material/Box';
import React, {useState, useEffect } from 'react'
import UserDetailsTable from "../Tables/UserDetailsTable.js";



function UserDetails({match}) {
  const [users, setUsers] = useState([]); //inventory state
  const [spinner, setSpinner] = useState(false); //spinner state
 
    //initial call to grab users from DB on load
    useEffect(() => {
      fetchUsers();
      if (localStorage.getItem("authorization") === null)
        window.location.href = "/login";
    }, []);
  
  /**
   * @returns users
   * fetches DB after any changes to the results array from the user on the front end
   */
   const fetchUsers = async () => {
    setSpinner(true);
    axios.get('http://localhost:3000/users',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    })
      .then(res => {
        setUsers(res.data);
        setSpinner(false);
      })
      .catch(err => {
        console.log(err);
        setSpinner(false);
      })
  };

        return (
          <main>  
            <Box sx={{ml: 15, mt: 2}}>
              <h1>Name of User Selected</h1>
            </Box>

            <Box sx={{ ml: 8, mt: 1 }}>
              <UserDetailsTable users={users} fetchUsers={fetchUsers} spinner={spinner}/>
            </Box>
          </main>  
          );
        }
      
export default UserDetails;