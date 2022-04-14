import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DotDropDown from "./DotDropDown.js";
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Tooltip from '@mui/material/Tooltip';

export default function RowsGrid({ inventory, fetchInventory, spinner }) {
  const onDelete = async (params) => {
    console.log(params.formattedValue);
    let id = params.formattedValue;
    axios({
      method: "delete",
      url:
        "http://localhost:3000/inventory" ||
        "https://postgres-apr.herokuapp.com/inventory",
      data: {
        id: id,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          fetchInventory();
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
        width: "90%",
        overflow: "hidden",
        ml: 7,
      }}
    >
      {spinner ? (
        <h1>Im fucking trying! Fucking AFNET</h1>
      ) : (
        <div style={{ height: 530, width: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                components={{ Toolbar: GridToolbar }}
                stopColumnsSorts={[{ field: "ratin", sortable: false }]}
                columns={[
                  { field: "Name", minWidth: 130 },
                  { field: "Brand", minWidth: 150 },
                  { field: "NSN", minWidth: 100 },
                  { field: "Size", minWidth: 100 },
                  { field: "Gender", minWidth: 100 },
                  { field: "Bldg", minWidth: 100 },
                  { field: "Aisle", minWidth: 100 },
                  {
                    field: "Count",
                    minWidth: 100,
                    editable: true,
                  },
                  {
                    field: "Count Status",
                    renderCell: () => (
                      <FiberManualRecordIcon
                        fontSize="small"
                        // sx={{
                        //   mr: 2,
                        //   color:
                        //     props.status === "connected" ? "#4caf50" : "#d9182e",
                        // }}
                      />
                    ),
                  },
                  { field: "Initial", minWidth: 100 },
                  // {
                  //   field: "Issue",
                  //   renderCell: () => <AddIcon sx={{ cursor: "pointer" }} />,
                  // },
                  {
                    field: "Delete",
                    minWidth: 10,
                    renderCell: (params) => (
                      <Tooltip title= 'Delete Item'>
                        <DeleteIcon
                          sx={{ cursor: "pointer", color: '#ef5350' }}
                          onClick={() => onDelete(params)}
                        />
                      </Tooltip>
                    ),
                  },
                  {
                    field: "Edit",
                    minWidth: 10,
                    renderCell: (params) => (
                      <Tooltip title= 'Edit Item'>
                        <EditIcon
                          sx={{ cursor: "pointer", color: '#fdd835' }}
                          // onClick={() => onDelete(params)}
                        />
                      </Tooltip>
                    ),
                  },
                ]}
                rows={inventory?.map((row, index) => {
                  return {
                    id: index,
                    Delete: row.item_id,
                    Edit: row.item_id,
                    Name: row.item_name,
                    Brand: row.brand,
                    NSN: row.nsn,
                    Bldg: row.building,
                    Size: row.item_size,
                    Count: row.item_count,
                    Gender: row.gender,
                    Aisle: row.aisle,
                    Initial: row.intial_gear,
                  };
                })}
              />
            </div>
          </div>
        </div>
      )}
    </Box>
  );
}
