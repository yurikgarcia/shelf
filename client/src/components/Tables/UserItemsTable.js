import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import warehouse from "..//Images/warehouse.gif";
import { Route, Link, useMatch, matchPath, useLocation } from 'react-router-dom';


export default function RowsGrid({ }) {

  const [spinner, setSpinner] = useState(false); //spinner state
  const [user, setUser] = useState([]); //selected user state
  const location = useLocation(); //React Router Dom hook used to pull the dod_id from the URL
  const selectedUserDodId = location.state.DoD //Pulling Dod ID from location to use as param for SQL calls


  useEffect(() => {
    fetchUsers2();
    if (localStorage.getItem("authorization") === null)
      window.location.href = "/login";
  }, []);


  const fetchUsers2 = async () => {
    setSpinner(true);
    axios.get(`http://localhost:3000/issueditems/${selectedUserDodId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    })

      .then((res) => {
        setUser(res.data);
        setSpinner(false);
      }
      )
      .catch((err) => {
        console.log(err);
        setSpinner(false);
      }
      );
  }

  console.log("/UserItemsTable: user",user)



  //function that iterates through the user array and returns the issued_items array as issuedItems
  const issuedItems = user.map((user) => {
    return user.issued_items;
  }
  );

console.log("/UserItemsTable: issuedItems",issuedItems)

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
                  { field: "Name", minWidth: 150 },
                  { field: "Brand", minWidth: 130 },
                  { field: "NSN", minWidth: 100 },
                  { field: "Size", minWidth: 100 },
                  { field: "Gender", minWidth: 100 },
                  { field: "Count", minWidth: 100 },
                  { field: "Returnable", minWidth: 100 },
                ]}
                rows={issuedItems[0]?.map((row, index) => {
                  return {
                    id: index,
                    Name: row.Name,
                    Brand: row.Brand,
                    NSN: row.dod_id,
                    Size: row.item_size,
                    Count: row.item_count,
                    Gender: row.gender,
                    Returnable: row.returnable_item,
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