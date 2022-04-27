import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function AddModal({ users, setUsers, fetchUsers }) {
  const [AddModalOpen, setAddModalOpen] = useState(false); //Event Handler for Add Modal 
  const [addedItem, setAddedItem] = useState({
    dod_id: '',
    first_name: '',
    last_name: '',
    email: '',
  })
  const handleAddOpen = () => setAddModalOpen(true);
  const handleCloseAddModal = () => setAddModalOpen(false);

  /**
   * adds a new users to the DB based on the state set from the textfields
   */
  const addUserToUserTable = async () => {
    const newUsers = addedItem;
    axios.post('http://localhost:3000/users', { item: newUsers })
      .then(res => {
        if (res.status === 200) {
          setUsers([...users, newUsers])
          fetchUsers()
          setAddModalOpen(false)
        }
      })
      .catch(err => {
        alert('Sorry! Something went wrong. Please try again.')
        console.log('err', err);
      })
  };

  const [initial, setInitial] = useState('');
  const handleChange = (event) => {
    setInitial(event.target.value);
  };

  const [returnable, setReturnable] = useState('');
  const handleReturnable = (event) => {
    setReturnable(event.target.value);
  };

  return (
    <div>
      <Box sx={{ ml: 15, mt: 1 }}>
        <Button variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddOpen}
          color='secondary'
        >
          ADD Users
        </Button>
      </Box>
      <Modal
        open={AddModalOpen}
        onClose={handleCloseAddModal}
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
          border: '3px solid',
          borderRadius: '16px',
          boxShadow: 19,
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
                onChange={(e) => setAddedItem({ ...addedItem, first_name: e.target.value })}
              />
              <TextField
                id="outlined-error"
                label="Last Name"
                onChange={(e) => setAddedItem({ ...addedItem, last_name: e.target.value })}
              />
            </div>
            <div>
              <TextField
                id="outlined-error-helper-text"
                label="DOD ID"
                onChange={(e) => setAddedItem({ ...addedItem, dod_id: e.target.value })}
              />
              <TextField
                id="outlined-error-helper-text"
                label="E-Mail"
                onChange={(e) => setAddedItem({ ...addedItem, email: e.target.value })}
              />
            </div>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button color='secondary' variant="contained" startIcon={<SaveIcon />} onClick={() => addUserToUserTable()}>
                Submit
              </Button>
              <Button
                color='secondary'
                variant="contained"
                startIcon={<CancelIcon />}
                onClick={handleCloseAddModal}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}