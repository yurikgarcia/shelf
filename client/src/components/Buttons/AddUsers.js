import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';


export default function AddUsers({ users, setUsers, fetchUsers }) {
  const [AddUserOpen, setAddUserOpen] = useState(false); //Event Handler for Add Modal 
  const [addedUsers, setAddedUsers] = useState({
    dod_id: '',
    first_name: '',
    last_name: '',
    email: '',
    organization: '',
    ima: '-'
  })

  const options = [
    { label: '45 SFS'},
    { label: 'SLD 45'},
  ];
  
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
  const addUserToUserTable = async () => {
    const newUsers = addedUsers;
    axios.post('http://localhost:3000/users', { users: newUsers })
      .then(res => {
        if (res.status === 200) {
          setUsers([...users, newUsers])
          setAddUserOpen(false)
        }
      })
      .catch(err => {
        alert('Sorry! Something went wrong. Please try again.')
        console.log('err', err);
      })
  };

  // const [initial, setInitial] = useState('');
  // const handleChange = (event) => {
  //   setInitial(event.target.value);
  // };

  // const [returnable, setReturnable] = useState('');
  // const handleReturnable = (event) => {
  //   setReturnable(event.target.value);
  // };

  return (
    <div>
      <Box sx={{ ml: 15, mt: 1 }}>
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
              <TextField
                id="outlined-error"
                label="First Name"
                required={true}
                onChange={(e) => setAddedUsers({ ...addedUsers, first_name: e.target.value })}
              />
              <TextField
                id="outlined-error"
                label="Last Name"
                required={true}
                onChange={(e) => setAddedUsers({ ...addedUsers, last_name: e.target.value })}
              />
            </div>
            <div>
              <TextField
                id="outlined-error-helper-text"
                label="DOD ID"
                onChange={(e) => setAddedUsers({ ...addedUsers, dod_id: e.target.value })}
              />
              <TextField
                id="outlined-error-helper-text"
                label="E-Mail"
                required={true}
                onChange={(e) => setAddedUsers({ ...addedUsers, email: e.target.value })}
              />
            </div>
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
                    <MenuItem value={'YES'}>Yes</MenuItem>
                    <MenuItem value={'NO'}>No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120, ml: 1, mt:1 }}>
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
              </Box>
            </Stack>
            </div>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mr: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button
                color='secondary'
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCloseAddUser}
              >
                Cancel
              </Button>
              <Button color='secondary' variant="contained" startIcon={<SaveIcon />} 
                      onClick={() => {addUserToUserTable()  
                      window.location.reload()}}>
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}