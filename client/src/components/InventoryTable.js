import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Tooltip from '@mui/material/Tooltip';


import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";

export default function RowsGrid({ inventory, fetchInventory, spinner }) {

  const [editedItem, setEditedItem] = useState({
    Name: '',
    Brand: '',
    NSN: '',
    Bldg: '',
    Size: '',
    Count: 0,
    Gender: '',
    Aisle: '',
    Initial: false,
    MinCount: 0,
    Ordered: 0,
    Returnable: false
  });

  const [newValue, setNewValue] = useState({
    Delete: '',
    Name: '',
    Brand: '',
    NSN: '',
    Bldg: '',
    Size: '',
    Count: 0,
    Gender: '',
    Aisle: '',
    Initial: false,
    MinCount: 0,
    Ordered: 0,
    Returnable: false
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = async (params) => {
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

  const onEditOpen = (params) => {
    setEditedItem(params.row)
    setNewValue(params.row)
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    axios({
      method: "patch",
      url:
        "http://localhost:3000/inventory" ||
        "https://postgres-apr.herokuapp.com/inventory",
      data: {
        Delete: newValue.Delete,
        Name: newValue.Name,
        Brand: newValue.Brand,
        NSN: newValue.NSN,
        Bldg: newValue.Bldg,
        Size: newValue.Size,
        Count: newValue.Count,
        Gender: newValue.Gender,
        Aisle: newValue.Aisle,
        Initial: newValue.Initial,
        MinCount: newValue.MinCount,
        Ordered: newValue.Ordered,
        Returnable: newValue.Returnable
      }
    })
      .then(() => {
        console.log("success");
        fetchInventory();
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

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
                  {
                    field: "Delete",
                    minWidth: 10,
                    renderCell: (params) => (
                      <Tooltip title='Delete Item'>
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
                    editable: true,
                    renderCell: (params) => (
                      <EditIcon
                        sx={{ cursor: "pointer", color: '#fdd835' }}
                        onClick={() => onEditOpen(params)}
                      />

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
                    MinCount: row.minimum_count,
                    Ordered: row.ordered,
                    Returnable: row.returnable_item
                  };
                })}
              />

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 425,
                  bgcolor: 'background.paper',
                  border: '6px solid #000',
                  borderRadius: '16px',
                  boxShadow: 19,
                  p: 4,
                  borderColor: '#f57c00'
                }} >
                  <CardContent>
                    <Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
                          Edit Details
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      id="modal-modal-description"
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "15ch" }, mt: 2
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          disabled={false}
                          id="filled"
                          variant="filled"
                          label="Name"
                          defaultValue={editedItem?.Name}
                          sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, Name: e.target.value })}
                        />
                        <TextField
                          id="filled"
                          variant="filled"
                          label="NSN"
                          defaultValue={editedItem?.NSN}
                          sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, NSN: e.target.value })}
                        />
                      </div>
                      <div>
                        <TextField
                          id="filled"
                          variant="filled"
                          label="Location"
                          defaultValue={editedItem?.Bldg}
                          sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, Bldg: e.target.value })}
                        />
                        <TextField
                          id="filled"
                          variant="filled"
                          label="Size"
                          defaultValue={editedItem?.Size}
                          sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, Size: e.target.value })}
                        />
                      </div>
                      <div>
                        <TextField
                          id="filled"
                          variant="filled"
                          label="On Hand"
                          defaultValue={editedItem?.Count}
                          sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, Count: e.target.value })}
                        />
                        <TextField
                          id="filled"
                          variant="filled"
                          label="Minimum Count"
                          defaultValue={editedItem?.MinCount}
                          sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, MinCount: e.target.value })}
                        />
                      </div>
                      <div>
                        <TextField
                          id="filled"
                          variant="filled"
                          label="Returnable Item"
                          defaultValue={editedItem?.Returnable}
                          sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, Returnable: e.target.value })}
                        />
                        <TextField
                          id="filled"
                          variant="filled"
                          label="Ordered"
                          defaultValue={editedItem?.Ordered}
                          sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, Ordered: e.target.value })}
                        />
                      </div>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Box sx={{ ml: 9, mt: 1 }}>
                      <Stack direction="row" spacing={2}>
                        <Button color='secondary' variant="contained" type="submit" startIcon={<SaveIcon />} onClick={(e) => handleSubmit(e)}>
                          Save
                        </Button>

                        <Button color='secondary' variant="contained" startIcon={<CancelIcon />} onClick={() => setOpen(false)}>
                          Cancel
                        </Button>
                      </Stack>
                    </Box>
                  </CardActions>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      )
      }
    </Box >
  );
}
