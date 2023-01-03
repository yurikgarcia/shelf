import axios from 'axios';
import Box from '@mui/material/Box';
import React, {useState, useEffect, useContext } from 'react'
import UserItemsTable from "../Tables/UserItemsTable.js";
import { useLocation } from 'react-router-dom';
import AppContext from "../AppContext.js";



function UserDetails( ) {

  const [user, setUser] = useState([]); //selected user state

  const { API } = useContext(AppContext);

  useEffect(() => {
    // fetchUsers();
    if (localStorage.getItem("authorization") === null)
      window.location.href = "/login";
  }, []);

    //fetch that pulls the issues items of the selectedUserDodId from the db
    const fetchUsers = async () => {
    const selectedUserDodId = '13';
    console.log("API inside function", API.website)
      axios.get(`${API.website}/issueditems/${selectedUserDodId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
      })
        .then((res) => {
          setUser(res.data);
        }
        )
        .catch((err) => {
          console.log(err);
         
        }
        );
    }


  const location = useLocation();//REact Router Hooked used to bring in the state of selected user and set the title of the page

  
        return (
          <main>  
            <Box sx={{ml: 15, mt: 2}}>
              {/* <h1>{location.state.First} {location.state.Last}: Issued Items </h1> */}
                <h1>{location.state.First} {location.state.Last}: Issued Items </h1>
            </Box>

            <Box sx={{ ml: 8, mt: 1 }}>
              <UserItemsTable />
            </Box>
          </main>  
          );
        }
      
export default UserDetails;