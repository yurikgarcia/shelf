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
import { Link, useParams, useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ViewListIcon from '@mui/icons-material/ViewList';
import warehouse from "..//Images/warehouse.gif";


export default function RowsGrid({ users, fetchUsers, spinner}) {

  const [editedUser, setEditedUser] = useState({
    First: '',
    Last: '',
    DoD: '',
    Email: '',
    Organization: '',
    IMA: ''
  });

  const [newValue, setNewValue] = useState({
    First: '',
    Last: '',
    DoD: '',
    Email: '',
    Organization: '',
    IMA: ''
    // Password: '',
    // Admin: false
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = async (params) => {
    let id = params.formattedValue;
    axios({
      method: "delete",
      url:
        "http://localhost:3000/users", 
      data: {
        id: id,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          fetchUsers();
        }
      })
      .catch((err) => {
        alert("Sorry! Something went wrong. Please try again.");
        console.log("err", err);
      });
  };

  const onEditOpen = (params) => {
    setEditedUser(params.row)
    setNewValue(params.row)
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    axios({
      method: "patch",
      url:
        "http://localhost:3000/users" ,
      data: {
        First: newValue.First,
        Last: newValue.Last,
        DoD: newValue.DoD,
        Email: newValue.Email,
        Organization: newValue.Organization,
        IMA: newValue.IMA
        // Password: newValue.Password,
        // Admin: newValue.Admin
      }
    })
      .then(() => {
        console.log("success");
        fetchUsers();
      })
      .catch((err) => {
        console.log('err', err)
      })
  }


  const [selectedUserDodId, setSelectedUserDodId] = useState({
    DoD: '',
  });

  const navigate = useNavigate();

  const goToUserDetails = (params) => {
    setSelectedUserDodId(params.row);
    navigate('/issueditems', {state: params.row});
    console.log("params.row", params.row)
} 






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
                  // { field: "DoD", minWidth: 100 },
                  { field: "Email", minWidth: 170 },
                  { field: "Organization", minWidth: 100 },
                  { field: "IMA", minWidth: 170 },
                  { field: "Warehouses", minWidth: 170 },
                  // { field: "Password", minWidth: 170 },
                  // { field: "Admin", minWidth: 170 },
                  {
                    field: "Edit",
                    minWidth: 10,
                    editable: true,
                    renderCell: (params) => (
                      <Tooltip title='Edit User'>
                      <EditIcon
                        sx={{ cursor: "pointer", color: '#FF9A01' }}
                        onClick={() => onEditOpen(params)}
                      />
                      </Tooltip>

                    ),
                  },
                  {
                    field: "Delete",
                    minWidth: 10,
                    renderCell: (params) => (
                      <Tooltip title='Delete User'>
                        <DeleteIcon
                          sx={{ cursor: "pointer", color: '#ef5350' }}
                          onClick={() => onDelete(params)}
                        />
                      </Tooltip>
                    ),
                  },
                  {
                    field: "Items",
                    minWidth: 10,
                    renderCell: (params) => (
                      <Tooltip title='Issued Items'>
                        {/* <Link to={`/users/${params.row.First}${params.row.Last}/${params.row.Delete}`}  style={{ textDecoration: 'none', color: 'black' }}> */}
                          <ViewListIcon
                            sx={{ cursor: "pointer", color: 'grey' }}
                            onClick={() => goToUserDetails(params)}
                          />
                        {/* </Link> */}
                      </Tooltip>
                    ),
                  },
                ]}
                rows={users?.map((row, index) => {
                  return {
                    id: index,
                    Delete: row.dod_id,
                    Edit: row.dod_id,
                    Items: row.dod_id,
                    First: row.first_name,
                    Last: row.last_name,
                    Organization: row.organization,
                    DoD: row.dod_id,
                    Email: row.email,
                    IMA: row.ima,
                    Warehouses: row.warehouse_access?.map((warehouse) => {
                      return warehouse.Name
                    }
                    ).join(', ')
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
                  borderRadius: '16px',
                  boxShadow: "0px 2px 0px 0px #FF9A01,0px 2px 25px 5px #FF9A01",
                  p: 4,
                  borderColor: '#FF9A01'
                }} >
                  <CardContent>
                    <Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
                          Edit User: {editedUser?.First} {editedUser.Last}  
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
                          label="First Name"
                          defaultValue={editedUser?.First}
                          sx={{ borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, First: e.target.value })}
                        />
                        <TextField 
                          id="filled"
                          label="Last Name"
                          defaultValue={editedUser?.Last}
                          sx={{ borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, Last: e.target.value })}
                        />
                      </div>
                      <div>
                        {/* <TextField
                          id="filled"
                          label="DoD ID"
                          defaultValue={editedUser?.DoD}
                          sx={{ borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, DoD: e.target.value })}
                        /> */}
                        <TextField
                          id="filled"
                          label="Email"
                          defaultValue={editedUser?.Email}
                          sx={{ borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, Email: e.target.value })}
                        />
                        <TextField
                          id="filled"
                          label="IMA"
                          defaultValue={editedUser?.IMA}
                          sx={{ borerRadius: '5' }}
                          onChange={(e) => setNewValue({ ...newValue, IMA: e.target.value })}
                        />
                      </div>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Box sx={{ ml: 7, mt: 1 }}>
                      <Stack direction="row" spacing={2}>
                        <Button color='secondary' variant="contained" type="submit" startIcon={<SaveIcon />} onClick={(e) => handleSubmit(e)}>
                          Save
                        </Button>

                        <Button color='secondary' variant="outlined" startIcon={<CancelIcon />} onClick={() => setOpen(false)}>
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