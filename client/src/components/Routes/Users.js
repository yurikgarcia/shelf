import React, { useState, useEffect } from 'react';
import AddUsers from "..//Buttons/AddUsers.js";
import Box from '@mui/material/Box';
import UserTable from "../Tables/UserTable.js";
import axios from 'axios';

function Inventory() {
  const [users, setUsers] = useState([]); //inventory state
  const [spinner, setSpinner] = useState(false); //spinner state

  //initial call to grab inventory from DB on load
  useEffect(() => {
    fetchUsers();
    if (localStorage.getItem("authorization") === null)
      window.location.href = "/login";
  }, []);


  /**
   * @returns inventory
   * fetches DB after any changes to the resutls array from the user on the front end
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
    <div>
      <div>
        <main>
        <Box sx={{ml: 15, mt: 2}}>
            <h1>Users</h1>
          </Box>

          <Box sx={{display:"flex", flexDirection: 'row'}}>
              <AddUsers users={users} setUsers={setUsers} fetchInventory={fetchUsers}/>    
          </Box>

          <Box sx={{ ml: 8, mt: 1 }}>
            <UserTable users={users} fetchUsers={fetchUsers} spinner={spinner}/>
          </Box>
        </main>
      </div>
    </div>

  );
}

export default Inventory;