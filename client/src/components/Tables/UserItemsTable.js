import React, { useState, useEffect } from "react";
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Route, Link, useMatch, matchPath, useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import ViewListIcon from '@mui/icons-material/ViewList';
import warehouse from "..//Images/warehouse.gif";


export default function RowsGrid({ }) {

  const [spinner, setSpinner] = useState(false); //spinner state
  const [user, setUser] = useState([]); //selected user state
  const location = useLocation(); //React Router Dom hook used to pull the dod_id from the URL
  const selectedUserDodId = location.state.DoD //Pulling Dod ID from location to use as param for SQL calls
  const user_dod = localStorage.getItem("user_dod"); //Pulling Dod ID from local storage to use as param for SQL calls
  const [newShoppingCart, setNewShoppingCart] = useState([]); //shopping cart state

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

    //initial call to grab inventory from DB on load
    useEffect(() => {
      fetchNewShoppingCart();
    }, []);

      /**
   * shopping Cart fetch
   */
  const fetchNewShoppingCart = async () => {
    // setSpinner(true);
    axios
      .get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
      })
      .then((res) => {
        setNewShoppingCart(res.data);
        // setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        // setSpinner(false);
      });
  };



  //function that iterates through the user array and returns the issued_items array as issuedItems
  const issuedItems = user.map((user) => {
    return user.issued_items;
  }
  );

    /**
   * adds to shopping cart column in the users table
   */

    const addToCart = async (params) => {
      let userShoppingCart = params.row;
      console.log("usertable add to cart",userShoppingCart)
      axios
      .patch(`http://localhost:3000/shopping-cart/${user_dod}`, userShoppingCart)
        .then((res) => {
          if (res.status === 200) {
            setNewShoppingCart([...newShoppingCart, userShoppingCart]);
            fetchNewShoppingCart();
          }
        })
        .catch((err) => {
          alert("Sorry! Something went wrong. Please try again.");
          console.log("err", err);
        });
      };


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
                  { field: "Quantity", minWidth: 100 },
                  { field: "Returnable", minWidth: 100 },
                  {
                    field: "Return",
                    minWidth: 10,
                    editable: true,
                    renderCell: (params) => (
                      <Tooltip title="Return Item">
                        <AssignmentReturnedIcon 
                          sx={{ cursor: "pointer", color: "#4CAF50" }}
                          onClick={() => addToCart(params)}
                        />
                      </Tooltip>
                    ),
                  },
                ]}
                rows={issuedItems[0]?.map((row, index) => {
                  return {
                    id: index,
                    Name: row.Name,
                    Brand: row.Brand,
                    NSN: row.NSN,
                    Size: row.Size,
                    Quantity: row.Quantity,
                    Gender: row.Gender,
                    Returnable: row.Returnable,
                    UUID: row.UUID,
                    Count: row.Count,
                    Gender: row.Gender
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