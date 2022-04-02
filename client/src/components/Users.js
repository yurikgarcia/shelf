import * as React from "react";
import Box from '@mui/material/Box';
import UserSelect from "./UserSelect.js";
import UserCard from "./UserCard.js";
import UserItemTable from "./UserItemTable.js";



function Users() {
  

  return (
    <div>




      <Box sx={{ml: 15, mt:2}}>
        <h1>Users</h1>
      </Box>

      <Box sx={{ml: 15, mt:1}}>
        <UserSelect/>
      </Box>

      <Box sx={{ml: 15, mt:2}}>
        <UserCard/>
      </Box>

      <Box sx={{ml: 9, mt:2}}>
        <UserItemTable/>
      </Box>


    </div>

  );
}

export default Users;