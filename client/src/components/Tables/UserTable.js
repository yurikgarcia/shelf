import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
    IMA: '',
    Warehouses: '',
    FullWarehouses: '',
  });

  const [newValue, setNewValue] = useState({
    First: '',
    Last: '',
    DoD: '',
    Email: '',
    Organization: '',
    IMA: '',
  });

  const [editedUserWarehouses, setEditedUserWarehouses] = useState({
    Warehouses: ''
});

  const [adminWarehouses, setAdminWarehouses] = React.useState([]);//warehouses admin has access to
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (params) => {
  setEditedUser(params.row)
  setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  //checks editUser.Warehouse if it includes the warehouse name set to true
  const [warehouseAccess, setWarehouseAccess] = useState({
    sfs45_patrick: false,
    sfs45_cape: false,
  });
  
//function that checks for the users current warehouse access and sets the warehouseAccess state to true/false
  const setWarehouseCheck = (editedUser) => {
    // console.log("FROM FUNCTION: ", editedUser.row.Warehouses);
    let access = {
      sfs45_patrick: false,
      sfs45_cape: false,
    }
    if (editedUser.row.Warehouses.includes("45 SFS - Patrick")) {
      access.sfs45_patrick = true;
    }
    if (editedUser.row.Warehouses.includes("45 SFS - Cape")) {
      access.sfs45_cape = true;
    }
    setWarehouseAccess(access);  
  }

        //initial call to grab users from DB on load
        useEffect(() => {
          fetchLoggedAdminWarehouses();
        }, []);
    
          /**
       * fetches the logged in user's warehouses from the DB
       */
          const fetchLoggedAdminWarehouses = async () => {
            let adminID = localStorage.user_dod
            axios
            .get(`http://localhost:3000/admin-warehouses/${adminID}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authorization")}`,
              },
            })
            .then((res) => {
              setAdminWarehouses(res.data);
            })
            .catch((err) => { 
              console.log(err);
            });
          };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = async (params) => {
    let id = editedUser.Delete;
    console.log("ID: ", id);
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
        IMA: newValue.IMA,
        Warehouses: newValue.Warehouses
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

  //function that sets the initial state of editedUserWarehouses to editedUser.Warehouses
  const setWarehouses = (editedUser) => {
    setEditedUserWarehouses(editedUser.row.FullWarehouses);
  }

  // console.log("SETWAREHOUSES: ", editedUserWarehouses);

  //function that takes in editedUserWarehouses and sets the keys in the object key value pair to a string
  //example {Name : "45 SFS Patrick AFB", Table: "sfs45_patrick"} becomes {"Name" : "45 SFS Patrick", "Table" : "sfs45_patrick"}
  const handleUserPermissions = async (e) => {
      let warehousePermissions = JSON.stringify(editedUserWarehouses.Warehouses)
    e.preventDefault();
    if (warehousePermissions.length === 2) {
      console.log("Null")
    axios({
      method: "patch",
      url:
        "http://localhost:3000/usersPermissionsNull" ,
      data: {
        DoD: editedUser.DoD,
        Warehouses: warehousePermissions
      }
    })
      .then(() => {
        console.log("set to null");
        fetchUsers();
      })
      .catch((err) => {
        console.log('err', err)
      })
  } else {
    console.log("NULL HIT")
    axios({
      method: "patch",
      url:
        "http://localhost:3000/usersPermissions" ,
      data: {
        DoD: editedUser.DoD,
        Warehouses: warehousePermissions
      }
    })
      .then(() => {
        console.log("permissions set");
        fetchUsers();
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

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

  //function that fires handleOrganizationChange and handleChange when a checkbox is clicked
  const handleCheckbox = (event) => {
    handleChange(event)
    handleWarehouseChange(event)
  }

  const handleChange = (event) => {
    setWarehouseAccess({
      ...warehouseAccess,
      [event.target.name]: event.target.checked,
    });
    handleUserPermissions()
  }; 

  //function that checks if event.target.checked is true or false and adds to the state of editedUserWarehousesUsers array 
  //if event.target.checked is false, it removes the index from the array

  // function that finds the index of 45 SFS - Patrick in the editedUsersWarehouses array
  const handleWarehouseChange = (event) => {
    if (event.target.checked === true) {
      setEditedUserWarehouses({ ...editedUserWarehouses, Warehouses: [...editedUserWarehouses.Warehouses, {"Name": event.target.id, "Table": event.target.name}] })
    } 
    if (event.target.checked === false) {
      let wareHouseIndex = editedUserWarehouses.Warehouses.findIndex(object => {
        return object.Name === event.target.id
      })
      editedUserWarehouses.Warehouses.splice(wareHouseIndex, 1)
    }
}
  

const { sfs45_patrick, sfs45_cape } = warehouseAccess;

const wareHouseLength = adminWarehouses.length;

console.log("editedUser", editedUser)


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
          <div style={{ display: "flex", height: "100%", width: "100%"}}>
            <div style={{ flexGrow: 1, whiteSpace: 'normal'  }}>
              <DataGrid
                sx={{whiteSpace: 'normal', }}
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
                  { field: "Email", minWidth: 200 },
                  { field: "Organization", minWidth: 100 },
                  { field: "IMA", minWidth: 170 },
                  { field: "Warehouses", minWidth: 250 },
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
                        onClick={() => {
                          onEditOpen(params)
                          setWarehouseCheck(params)
                          // setWarehouses(params)
                          }}
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
                          onClick={() => handleOpenDeleteModal(params)}
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
                    ).join(', '),
                    FullWarehouses: row.warehouse_access,
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

                    <Divider sx={{ mt: 2, bgcolor: "#155E9C", borderBottomWidth: 3 }}/> 
                  
                  
                  {wareHouseLength > 0 ? (
                    <Box sx={{ display: 'flex' }}>
                      <FormControl
                        // required
                        // error={error}
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                      >
                        <FormLabel component="legend">Warehouse Access:</FormLabel>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox 
                                checked={sfs45_patrick} 
                                onChange={handleCheckbox} 
                                name="sfs45_patrick" 
                                id="45 SFS - Patrick" />
                              }
                                label="45 SFS - Patrick"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox 
                                checked={sfs45_cape} 
                                onChange={handleCheckbox} 
                                name="sfs45_cape" 
                                id="45 SFS - Cape" />
                              }
                              label="45 SFS - Cape"
                            />
                          </FormGroup>
                        </FormControl>
                    </Box>
                  ) : null}
                  
                  </CardContent>
                  <CardActions>
                    <Box sx={{ ml: 7, mt: 1 }}>
                      <Stack direction="row" spacing={2}>
                        <Button color='secondary' variant="contained" type="submit" startIcon={<SaveIcon />} 

                        
                        onClick={(e) => {
                          handleSubmit(e)
                          // getWarehouses()
                          handleUserPermissions(e)
                          // setTimeout(() => {
                          // window.location.reload()
                          // } , 500)
                        }
                        }
                        >
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

              <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '6px solid #000',
                  borderRadius: '16px',
                  boxShadow: "0px 2px 0px 0px #c62828,0px 2px 25px 5px #c62828",
                  p: 4,
                  borderColor: "#c62828",
                }} >
                  <DangerousOutlinedIcon sx={{ display: 'flex', justifyContent: 'center', ml:15, fontSize: 80 }}/>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      Are You Sure You Want To Delete: 
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <h3>{editedUser?.First} {editedUser.Last}</h3>
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                      Data from this item will be PERMENENTLY DELETED!
                    </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Stack direction="row" spacing={2}>
                      <Button
                        onClick={() => setOpenDeleteModal(false)}
                      color='secondary' variant="outlined" startIcon={<CancelIcon />}>
                        Cancel
                      </Button>
                      <Button color='secondary' variant="contained"                           
                          onClick={(params) => {
                            onDelete(params);
                            handleCloseDeleteModal();
                            }
                          } startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </Stack>
                  </Box>
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