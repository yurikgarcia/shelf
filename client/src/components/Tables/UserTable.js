import React, { useState, useEffect, useContext } from 'react';
import AppContext from "../AppContext.js";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import Dropzone from 'react-dropzone-uploader'
import EditIcon from '@mui/icons-material/Edit';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import PropTypes from 'prop-types';
import 'react-dropzone-uploader/dist/styles.css'
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ViewListIcon from '@mui/icons-material/ViewList';
import warehouse from "..//Images/warehouse.gif";
import { Widget } from "@uploadcare/react-widget";

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
  open={showFullCell && anchorEl !== null}
  anchorEl={anchorEl}
  style={{ width, marginLeft: -17 }}
>
<Paper
        elevation={1}
        style={{
          whiteSpace: 'normal',
          display: 'inline-block',
          width: '100%',
          backgroundColor: '#f8f8f8',
          border: '1px solid #ccc'
        }}
      >
    <div style={{ whiteSpace: 'normal', display: 'inline-block', width: '100%' }}>
      <Typography
        variant="body2"
        style={{ padding: 8, display: 'block', width: '100%' }}
        overflow="auto"
      >
        {value}
      </Typography>
    </div>
  </Paper>
</Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.string,
};


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

  const { API } = useContext(AppContext); 

  const [adminWarehouses, setAdminWarehouses] = React.useState([]);//warehouses admin has access to
  const [open, setOpen] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (params) => {
  setEditedUser(params.row)
  setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [openFileUploaderModal, setOpenFileUploaderModal] = React.useState(false);
  const handleOpenFileUploaderModal = (params) => {
  setEditedUser(params.row)
  setOpenFileUploaderModal(true);
  };
  const handleCloseFileUploaderModal = () => setOpenFileUploaderModal(false);

  //checks editUser.Warehouse if it includes the warehouse name set to true
  const [warehouseAccess, setWarehouseAccess] = useState({
    sfs45_patrick: false,
    sfs45_cape: false,
    sfs45s6: false, 
    fss45bowling: false,
  });
  
//function that checks for the users current warehouse access and sets the warehouseAccess state to true/false
  const setWarehouseCheck = (editedUser) => {
    // console.log("FROM FUNCTION: ", editedUser.row.Warehouses);
    let access = {
      sfs45_patrick: false,
      sfs45_cape: false,
      sfs45s6: false,
      fss45bowling: false,
    }
    if (editedUser.row.Warehouses.includes("45 SFS - Patrick")) {
      access.sfs45_patrick = true;
    }
    if (editedUser.row.Warehouses.includes("45 SFS - Cape")) {
      access.sfs45_cape = true;
    }
    if (editedUser.row.Warehouses.includes("45 SFS - S6")) {
      access.sfs45s6 = true;
    }
    if (editedUser.row.Warehouses.includes("45 FSS - Bowling")) {
      access.fss45bowling = true;
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
            .get(`${API.website}/admin-warehouses/${adminID}`, {
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

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = async (params) => {
    let id = editedUser.Delete;
    console.log("ID: ", id);
    axios({
      method: "delete",
      url:
        `${API.website}/users`, 
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
        `${API.website}/users` ,
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
        `${API.website}/usersPermissionsNull` ,
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
        `${API.website}/usersPermissions` ,
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
    // console.log("params.row from go to userdetails function", params.row)
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
  

const { sfs45_patrick, sfs45_cape, sfs45s6, fss45bowling } = warehouseAccess;

const wareHouseLength = adminWarehouses.length;

    //function that maps through adminWarehouses and returns adminWarehouse.warehouse_access
    const warehouses = adminWarehouses.map((adminWarehouse) => {
      return adminWarehouse.warehouse_access.flat()
    })

  //function that flatens the warehouses array
    const flatWarehouses = warehouses.flat()

    const warehouseTables = flatWarehouses.map((warehouse) => {
      return warehouse.Table
    })

      // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmitFile = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  console.log("localstorage", localStorage.admin_organization)



  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "99%",
        overflow: "hidden",
        boxShadow: 10
      }}
    >
      {spinner ? (
        <div>
          <img alt="warehouse" src={warehouse} width="900" />
        </div>

      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "77vh",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                sx={{whiteSpace: 'normal', }}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'First', sort: 'asc' }],
                  },
                  pagination: {
                    pageSize: 100,
                  },
                }}
                components={{ Toolbar: GridToolbar }}
                stopColumnsSorts={[{ field: "Delete", sortable: false }]}
                columns={[
                  { field: "First", minWidth: 150, renderCell: renderCellExpand  },
                  { field: "Last", minWidth: 150, renderCell: renderCellExpand  },
                  // { field: "DoD", minWidth: 100 },
                  { field: "Email", minWidth: 200, renderCell: renderCellExpand  },
                  { field: "Organization", minWidth: 100 },
                  { field: "IMA", minWidth: 50 },
                  { field: "Warehouses", minWidth: 250, renderCell: renderCellExpand  },
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
                  // {
                  //   field: "Files",
                  //   minWidth: 10,
                  //   renderCell: (params) => (
                  //     <Tooltip title='Files'>
                  //       {/* <Link to={`/users/${params.row.First}${params.row.Last}/${params.row.Delete}`}  style={{ textDecoration: 'none', color: 'black' }}> */}
                  //         <AttachFileIcon
                  //           sx={{ cursor: "pointer", color: '#1A73E8' }}
                  //           onClick={() => handleOpenFileUploaderModal(params)}
                  //         />
                  //       {/* </Link> */}
                  //     </Tooltip>
                  //   ),
                  // },
                ]}
                // rows={users.filter(user => user.organization === localStorage.admin_organization).map((row, index) => {
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
                          {warehouseTables.some(house => house === 'sfs45s6') ? (
                            <FormControlLabel
                              control={
                                <Checkbox 
                                checked={sfs45s6} 
                                onChange={handleCheckbox} 
                                name="sfs45s6" 
                                id="45 SFS - S6" />
                              }
                              label="45 SFS - S6"
                            /> ) : null}
                          {warehouseTables.some(house => house === 'sfs45_cape') ? (
                            <FormControlLabel
                              control={
                                <Checkbox 
                                checked={sfs45_cape} 
                                onChange={handleCheckbox} 
                                name="sfs45_cape" 
                                id="45 SFS - Cape" />
                              }
                              label="45 SFS - Cape"
                            />) : null}

                          {warehouseTables.some(house => house === 'sfs45_patrick') ? (
                            <FormControlLabel
                              control={
                                <Checkbox 
                                checked={sfs45_patrick} 
                                onChange={handleCheckbox} 
                                name="sfs45_patrick" 
                                id="45 SFS - Patrick" />
                              }
                                label="45 SFS - Patrick"
                            />) : null}

                            {warehouseTables.some(house => house === 'fss45bowling') ? (
                            <FormControlLabel
                              control={
                                <Checkbox 
                                checked={fss45bowling} 
                                onChange={handleCheckbox} 
                                name="fss45bowling" 
                                id="45 FSS - Bowling" />
                              }
                              label="45 FSS - Bowling"
                            />) : null}
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
                  // border: '6px solid #000',
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

              <Modal
                open={openFileUploaderModal}
                onClose={handleCloseFileUploaderModal}
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
                  // border: '6px solid #000',
                  borderRadius: '16px',
                  boxShadow: "0px 2px 0px 0px #1A73E8,0px 2px 25px 5px #1A73E8",
                  p: 4,
                  borderColor: "#1A73E8",
                }} >
                  <CloudDownloadOutlinedIcon sx={{ display: 'flex', justifyContent: 'center', ml:15, fontSize: 80 }}/>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      I am a file uploader, Your file sucks!
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <h3>{editedUser?.First} {editedUser.Last}</h3>
                    </Typography>

 
                    <Dropzone
                      getUploadParams={getUploadParams}
                      onChangeStatus={handleChangeStatus}
                      onSubmit={handleSubmitFile}
                      accept="image/*,application/pdf"
                    />
                

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Stack direction="row" spacing={2}>
                      <Button
                        onClick={() =>   setOpenFileUploaderModal(false)}
                      color='secondary' variant="outlined" startIcon={<CancelIcon />}>
                        Cancel
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