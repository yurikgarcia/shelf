import React, { useState, useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AppContext from "../AppContext.js";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ButtonGroup, IconButton, InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Checkbox from '@mui/material/Checkbox';
import Divider from "@mui/material/Divider";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));





const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));


export default function AddUsers({ users, setUsers, fetchUsers }) {
  const [AddUserOpen, setAddUserOpen] = useState(false); //Event Handler for Add Modal 
  const [addedUsers, setAddedUsers] = useState({
    dod_id: '',
    first_name: '',
    last_name: '-',
    email: '',
    organization: '',
    ima: '-',
    warehouses: '',
    warehouse_key: '',
  })

  const [handleFirstError, setHandleFirstError] = useState({
    first_name: '',
  })

  const [handleDODError, setHandleDODError] = useState({
    dod_id: '',
  })

  const [handleEmailError, setHandleEmailError] = useState({
    email: '',
  })

  const [revealPassword, setRevealPassword] = useState({
    email: '',
  })

  const { API } = useContext(AppContext);



  const handleUserOpen = () => setAddUserOpen(true);
  const handleCloseAddUser = () => setAddUserOpen(false);

  const handleIMA = (e) => {
    setAddedUsers({ ...addedUsers, ima: e.target.value })
};

  const handleOrganization = (e) => {
        setAddedUsers({ ...addedUsers, organization: e.target.value })
  };

  /**
   * adds a new users to the DB based on the state set from the textfields
   */
  const addAdminToUserTable = async () => {
    const newUsers = addedUsers;
    axios.post(`${API.website}/admins`, { users: newUsers })
      .then(res => {
        if (res.status === 200) {
          setUsers([...users, newUsers])
          setAddUserOpen(false)
          console.log('NEW USER', newUsers)
        }
      })
      .catch(err => {
        alert('Sorry! Something went wrong. Please try to add User again.')
        console.log('err', err);
      })
  };

    /**
   * adds a new users to the DB based on the state set from the textfields
   */
     const addUserToUserTable = async () => {
      const newUsers = addedUsers
      console.log('newUsers inside of this fucked up function', newUsers)
      axios.post(`${API.website}/users`, { users: newUsers })
        .then(res => {
          if (res.status === 200) {
            setUsers([...users, newUsers])
            setAddUserOpen(false)
            console.log('NEW USER', newUsers)
          }
        })
        .catch(err => {
          alert('Sorry! Something went wrong. Please try to add User again.')
          console.log('err', err);
        })
    };

  


  const [warehouseAccess, setWarehouseAccess] = useState({
    sfs45_patrick: false,
    sfs45_cape: false,
  });

  const handleSelect = (event) => {
    handleChange()
  }

  const handleChange = (event) => {
    setWarehouseAccess({
      ...warehouseAccess,
      [event.target.name]: event.target.checked,
    });
  };



  //function that checks if event.target.checked is true or false and adds to the state of addedUsers.warehouses array to the name of the checkbox and set addedUsers.warehouse_key
  //to the value of addedUsers.warehouses
  //if event.target.checked is false, it removes the name of the checkbox from the state of addedUsers.warehouses array and addedUsers.warehouse_key 

  const handleWarehouseChange = (event) => {
    if (event.target.checked === true) {
      setAddedUsers({ ...addedUsers, warehouses: [...addedUsers.warehouses, event.target.name] })
    } else {
      setAddedUsers({ ...addedUsers, warehouses: addedUsers.warehouses.filter((warehouse) => warehouse !== event.target.name) })
    }
  }

  //function that fires handleOrganizationChange and handleChange when a checkbox is clicked
  const handleCheckbox = (event) => {
    handleWarehouseChange(event)
    handleChange(event)
  }

  const { sfs45_patrick, sfs45_cape } = warehouseAccess;


  const errorHandlerFirst = (e) => {
    addedUsers.first_name.length === 0 ? setHandleFirstError({...handleFirstError, item_name: false}) : setHandleFirstError({...handleFirstError, item_name: true});
  }

  const errorHandlerDod = (e) => {
    addedUsers.dod_id.length === 0 ? setHandleDODError({...handleDODError, dod_id: false}) : setHandleDODError({...handleDODError, dod_id: true});
  }

  const errorHandlerEmail = (e) => {
    addedUsers.email.length === 0 ? setHandleEmailError({...handleEmailError, email: false}) : setHandleEmailError({...handleEmailError, email: true});
  }

  const [giveAdminRights, setGiveAdminRights] = useState(false);

  const switchHandler = (event) => {
    setGiveAdminRights(event.target.checked);
  };

console.log('users', users)

  return (
    <div>
      <Box>
        <Button variant="contained"
          startIcon={<AddIcon />}
          onClick={handleUserOpen}
          color='secondary'
        >
          ADD Users
        </Button>
      </Box>
      <Modal
        open={AddUserOpen}
        onClose={handleCloseAddUser}
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
          borderRadius: '16px',
          boxShadow: "0px 2px 0px 0px #4CAF50,0px 2px 25px 5px #4CAF50",
          p: 4,
          borderColor: "#58D407"
        }} >
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New User
            </Typography>
          </Box>
          <Box
            id="modal-modal-description"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "15ch" }, mt: 2, ml: 1.5
            }}
            noValidate
            autoComplete="off"
          >
            <div>
            { handleFirstError.item_name === false ? (
              <TextField
                id="outlined-error"
                label="First Name"
                required={true}
                error={true}
                onChange={(e) => setAddedUsers({ ...addedUsers, first_name: e.target.value })}
              />) : (
                <TextField
                id="outlined-error"
                label="First Name"
                required={true}
                onChange={(e) => setAddedUsers({ ...addedUsers, first_name: e.target.value })}
              />
              )}
              <TextField
                id="outlined-error"
                label="Last Name"
                onChange={(e) => setAddedUsers({ ...addedUsers, last_name: e.target.value })}
              />
            </div>
            <div>
            <Box sx ={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            { handleDODError.dod_id === false ? (
              <TextField
                id="outlined-error-helper-text"
                label="DOD ID"
                required={true}
                error={true}
                onChange={(e) => setAddedUsers({ ...addedUsers, dod_id: e.target.value })}
              />) : (
                <TextField
                id="outlined-error-helper-text"
                label="DOD ID"
                required={true}
                onChange={(e) => setAddedUsers({ ...addedUsers, dod_id: e.target.value })}
              />
              )}
                {/* <TextField
                id="outlined-error-helper-text"
                label="E-Mail"
                required={true}
                onChange={(e) => setAddedUsers({ ...addedUsers, email: e.target.value })}
              /> */}
            
          
              <FormControl sx={{width: 135, mt: 1, ml: 1}}>
                  <InputLabel id="demo-simple-select-label">Organization</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addedUsers.organization}
                    label="Organization"
                    onChange={handleOrganization}
                  >
                    <MenuItem value={'45 SFS'}>45 SFS</MenuItem>
                    <MenuItem value={'SLD 45'}>SLD 45</MenuItem>
                  </Select>
                </FormControl>
       
                </Box>
            </div>

            {users.some(user => user.dod_id === addedUsers.dod_id.toUpperCase()) ? (
                <Typography sx= {{ ml:1, fontSize: 12, color: 'error.main' }}>DoD Id number already exists!</Typography>
              ) : null }
            <div>
            <Stack direction="row" spacing={2}>
              <Box sx={{ minWidth: 120, ml: 1, mt:1 }}>
                <FormControl sx={{width: 135}}>
                  <InputLabel id="demo-simple-select-label">IMA</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addedUsers.ima}
                    label="IMA"
                    onChange={handleIMA}
                  >
                    <MenuItem value={'Yes'}>Yes</MenuItem>
                    <MenuItem value={'No'}>No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* <Box sx={{ minWidth: 120, ml: 1, mt:1 }}>
              <FormControl sx={{width: 135, mt: 1}}>
                  <InputLabel id="demo-simple-select-label">Organization</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addedUsers.organization}
                    label="Organization"
                    onChange={handleOrganization}
                  >
                    <MenuItem value={'45 SFS'}>45 SFS</MenuItem>
                    <MenuItem value={'SLD 45'}>SLD 45</MenuItem>
                  </Select>
                </FormControl>
              </Box> */}
            </Stack>
            </div>
          </Box>
          <Divider sx={{ mt: 2, bgcolor: "#155E9C", borderBottomWidth: 3 }}/> 

          <Box sx={{ml :2.5}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mt: 1}}>
              Administrator?
            </Typography>

              <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>No</Typography>
                  <AntSwitch 
                  defaultChecked 
                  inputProps={{ 'aria-label': 'ant design' }} 
                  checked={giveAdminRights} onChange={switchHandler}
                  />
                  <Typography>Yes</Typography>
                </Stack>
              </FormGroup>
          </Box>

          {giveAdminRights ? (
          <div>
              <Box
                sx={{
                  width: 290,
                  maxWidth: '100%',
                  mt: 2,
                  ml: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
              <TextField
                id="outlined-error-helper-text"
                label="E-Mail"
                required={true}
                onChange={(e) => setAddedUsers({ ...addedUsers, email: e.target.value })}
              />
              {/* <TextField
                id="outlined-error-helper-text"
                label="Password"
                fullWidth
                type="password"
                sx={{ mt: 2}}
                onChange={(e) => setAddedUsers({ ...addedUsers, password: e.target.value })}
              /> */}
              <TextField
                  id="outlined-password-input"
                  label="Password"
                  fullWidth
                  type={revealPassword ? "text" : "password"}
                  onChange={(e) => setAddedUsers({ ...addedUsers, password: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={() => setRevealPassword(!revealPassword)}
                        >
                          {revealPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mt: 2}}
                  
                />
              </Box>
            </div>) : (
              null
            )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mr: 1 }}>
            <Stack direction="row" spacing={2}>
              <Button
                color='secondary'
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCloseAddUser}
              >
                Cancel
              </Button>

              {/* {addedUsers.first_name.length !== 0 || addedUsers.dod_id.length !== 0 ?(
              <Button color='secondary' variant="contained" startIcon={<SaveIcon />} 
                      onClick={() => {
                        addAdminToUserTable()  
                        // window.location.reload()
                        }}>
                Submit
              </Button>) : (
                <Button color='secondary' variant="contained" startIcon={<SaveIcon />}
                
                      onClick={() => {
                        errorHandlerDod()
                        errorHandlerFirst()
                        }}
                      >Submit</Button>
              )} */}

            { addedUsers.dod_id.length !== 0 ? (
            <ButtonGroup>
                {giveAdminRights ? (
                <Button color='secondary' variant="contained" startIcon={<SaveIcon />} 
                        onClick={() => {
                          addAdminToUserTable()  
                          // window.location.reload()
                          }}>
                  Submit
                </Button>) : (
                  <Button color='secondary' variant="contained" startIcon={<SaveIcon />}
                        onClick={() => {
                          addUserToUserTable()  
                          }}
                        > Submit </Button>
                )}
            </ButtonGroup>
            ) : (
              <Button color='secondary' variant="contained" startIcon={<SaveIcon />}        
                onClick={() => {
                  errorHandlerDod()
                  // errorHandlerFirst()
                  }}
                > Submit </Button>
              )}
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}