import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import warehouse from "..//Images/warehouse.gif";


export default function RowsGrid({ users, fetchUsers, spinner}) {


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  console.log('usersdetailstable', users)


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
                ]}
                rows={users?.map((row, index) => {
                  return {
                    id: index,
                    First: row.first_name,
                    Last: row.last_name,
                    DoD: row.dod_id,
                    Email: row.email,
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