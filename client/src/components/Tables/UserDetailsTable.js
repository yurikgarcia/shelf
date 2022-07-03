import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import warehouse from "..//Images/warehouse.gif";
import { Route, Link, useMatch, matchPath, useLocation } from 'react-router-dom';


export default function RowsGrid({ users, spinner}) {

  const location = useLocation();

  return (
    <h1></h1>
  );
    // <Box
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     width: "93%",
    //     overflow: "hidden",
    //     ml: 7,
    //     boxShadow: 10
    //   }}
    // >
    //   {spinner ? (
    //     <div>
    //       <img alt="warehouse" src={warehouse} width="900" />
    //     </div>

    //   ) : (
    //     <div style={{ display: "flex", justifyContent: "center", height: "75vh", width: "100%" }}>
    //       <div style={{ display: "flex", height: "100%", width: "100%" }}>
    //         <div style={{ flexGrow: 1 }}>
    //           <DataGrid
    //             initialState={{
    //               sorting: {
    //                 sortModel: [{ field: 'First', sort: 'asc' }],
    //               },
    //               pagination: {
    //                 pageSize: 50,
    //               },
    //             }}
    //             components={{ Toolbar: GridToolbar }}
    //             stopColumnsSorts={[{ field: "Delete", sortable: false }]}
    //             columns={[
    //               { field: "First", minWidth: 150, },
    //               { field: "Last", minWidth: 130 },
    //               { field: "DoD", minWidth: 100 },
    //               { field: "Email", minWidth: 170 },
    //             ]}
    //             rows={users?.map((row, index) => {
    //               return {
    //                 id: index,
    //                 First: row.first_name,
    //                 Last: row.last_name,
    //                 DoD: row.dod_id,
    //                 Email: row.email,
    //               };
    //             })}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   )
    //   }
    // </Box >
  
}