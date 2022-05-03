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


export default function AddModal({ inventory, setInventory, fetchInventory }) {
  const [AddModalOpen, setAddModalOpen] = useState(false); //Event Handler for Add Modal 
  const [addedItem, setAddedItem] = useState({
    item_name: '',
    brand: '',
    nsn: '',
    item_size: '',
    gender: '',
    building: '',
    aisle: '',
    item_count: 0,
    minimum_count: 0,
    count_status: '',
    ordered: 0,
    intial_gear: false,
    returnable_item: true,
    initial: '',
    returnable: '',
    courier: '',
    tracking: '',
    contact: ''
  })
  const handleAddOpen = () => setAddModalOpen(true);
  const handleCloseAddModal = () => setAddModalOpen(false);

  /**
   * adds a new item to the DB based on the state set from the textfields
   */
  const addItemToInventory = async () => {
    const newInventory = addedItem;
    axios.post('http://localhost:3000/inventory' || 'https://postgres-apr.herokuapp.com/inventory', { item: newInventory })
      .then(res => {
        if (res.status === 200) {
          setInventory([...inventory, newInventory])
          fetchInventory()
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
          ADD Order
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
              Add New Order
            </Typography>
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
                id="outlined-error"
                label="Name"
                required={true}
                onChange={(e) => setAddedItem({ ...addedItem, item_name: e.target.value })}
              />
              <TextField
                id="outlined-error"
                label="Brand"
                onChange={(e) => setAddedItem({ ...addedItem, brand: e.target.value })}
              />
            </div>
            <div>
              <TextField
                id="outlined-error-helper-text"
                label="NSN"
                onChange={(e) => setAddedItem({ ...addedItem, nsn: e.target.value })}
              />
              <TextField
                id="outlined-error-helper-text"
                label="Size"
                onChange={(e) => setAddedItem({ ...addedItem, item_size: e.target.value })}
              />
            </div>
            <div>
              <TextField
                id="outlined-error-helper-text"
                label="Gender"
                onChange={(e) => setAddedItem({ ...addedItem, gender: e.target.value })}
              />
              <TextField
                id="outlined-error-helper-text"
                label="Building"
                onChange={(e) => setAddedItem({ ...addedItem, building: e.target.value })}
              />
            </div>
            <div>
              <TextField
                id="outlined-error-helper-text"
                label="Aisle"
                onChange={(e) => setAddedItem({ ...addedItem, aisle: e.target.value })}
              />
              <TextField
                id="outlined-error-helper-text"
                label="Item Count"
                placeholder='Number'
                type="number"
                onChange={(e) => setAddedItem({ ...addedItem, item_count: e.target.value })}
              />
            </div>
            <div>
              <TextField
                id="outlined-error-helper-text"
                label="Minimum Count"
                placeholder='Number'
                type="number"
                onChange={(e) => setAddedItem({ ...addedItem, minimum_count: e.target.value })}
              />
              {/* <TextField
                id="outlined-error-helper-text"
                label="Count Status"
                onChange={(e) => setAddedItem({ ...addedItem, count_status: e.target.value })}
              /> */}
              <TextField
                id="outlined-error-helper-text"
                label="Ordered"
                placeholder='Number'
                type="Number"
                onChange={(e) => setAddedItem({ ...addedItem, ordered: e.target.value })}
              />
              <TextField
                id="outlined-error-helper-text"
                label="Courier"
                onChange={(e) => setAddedItem({ ...addedItem, courier: e.target.value })}
              />
              <TextField
                id="outlined-error-helper-text"
                label="Tracking"
                onChange={(e) => setAddedItem({ ...addedItem, tracking: e.target.value })}
              />
            </div>
            <div>
              <TextField
                id="outlined-error"
                label="Initial Gear"
                onChange={(e) => setAddedItem({ ...addedItem, intial_gear: e.target.value })}
              />
              <TextField
                id="outlined-error"
                label="Returnable Item"
                onChange={(e) => setAddedItem({ ...addedItem, returnable_item: e.target.value })}
              />
            </div>
          </Box>
          <Stack direction="row" spacing={2}>
          <Box sx={{ ml: 1 }}>
              <FormControl sx={{ minWidth: 135 }}>
                <InputLabel id="demo-simple-select-label">Initial</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={initial}
                  label="Age"
                  onChange={handleChange}
                  
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
          </Box>
          <Box sx={{ml: 1}}>
              <FormControl sx={{ minWidth: 135 }}>
                <InputLabel id="demo-simple-select-label">Returnable</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={returnable}
                  label="Age"
                  onChange={handleReturnable}
                  
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
          </Box>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button color='secondary' variant="contained" startIcon={<SaveIcon />} onClick={() => addItemToInventory()}>
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
