import React, { useState, useEffect, useContext } from 'react';
import AddUsers from "..//Buttons/AddUsers.js";
import AppContext from "../AppContext.js";
import Box from '@mui/material/Box';
import UserTable from "../Tables/UserTable.js";
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]); //inventory state
  const [spinner, setSpinner] = useState(false); //spinner state

  const { API } = useContext(AppContext);

  //initial call to grab users from DB on load
  useEffect(() => {
    fetchUsers();
    if (localStorage.getItem("authorization") === null)
      window.location.href = "/login";
  }, []);



  /**
   * users
   * fetches DB after any changes to the results array from the user on the front end
   */
  const fetchUsers = async () => {
    setSpinner(true);
    axios.get(`${API.website}/users`,
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
    <div>
      <div>
        <main>
          <Box sx={{ml: 11, mt: 2}}>
              <h1>Users</h1>
          </Box>

          <Box sx={{display:"flex", flexDirection: 'row'}}>
              <AddUsers users={users} setUsers={setUsers} fetchInventory={fetchUsers}/>    
          </Box>

          <Box sx={{ ml: 4, mt: 1 }}>
            <UserTable users={users} fetchUsers={fetchUsers} spinner={spinner}/>
          </Box>
        </main>
      </div>
    </div>

  );
}

export default Users;