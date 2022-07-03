import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import warehouse from "..//Images/warehouse.gif";
import { Route, Link, useMatch, matchPath, useLocation } from 'react-router-dom';


export default function RowsGrid({ }) {

  const [spinner, setSpinner] = useState(false); //spinner state
  const [user, setUser] = useState([]); //selected user state

  useEffect(() => {
    fetchUsers2();
    if (localStorage.getItem("authorization") === null)
      window.location.href = "/login";
  }, []);

  const fetchUsers2 = async () => {
    setSpinner(true);
    axios.get('http://localhost:3000/issueditems',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    })
      .then(res => {
        setUser(res.data);
        setSpinner(false);
      })
      .catch(err => {
        console.log(err);
        setSpinner(false);
      })
  };
  

  //React Router Dom hook used to pull the dod_id from the URL
  const location = useLocation();


  console.log("location from table", location);

  console.log('selected from table', user);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "93%",
        overflow: "hidden",
        ml: 7,
        boxShadow: 10
      }}
    >
      {spinner ? (
        <div>
          <img alt="warehouse" src={warehouse} width="900" />
        </div>

      ) : (
        <div style={{ display: "flex", justifyContent: "center", height: "75vh", width: "100%" }}>
          <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'First', sort: 'asc' }],
                  },
                  pagination: {
                    pageSize: 50,
                  },
                }}
                components={{ Toolbar: GridToolbar }}
                stopColumnsSorts={[{ field: "Delete", sortable: false }]}
                columns={[
                  { field: "First", minWidth: 150, },
                  { field: "Last", minWidth: 130 },
                  { field: "DoD", minWidth: 100 },
                  { field: "Email", minWidth: 170 },
                  // { field: "Password", minWidth: 170 },
                  // { field: "Admin", minWidth: 170 },
                ]}
                rows={user?.map((row, index) => {
                  return {
                    id: index,
                    Delete: row.dod_id,
                    Edit: row.dod_id,
                    Items: row.dod_id,
                    First: row.first_name,
                    Last: row.last_name,
                    DoD: row.dod_id,
                    Email: row.email,
                    // Password: row.user_password,
                    // Admin: row.is_admin
                  };
                })}
              />

            </div>
          </div>
        </div>
      )
      }
    </Box >
  );
}