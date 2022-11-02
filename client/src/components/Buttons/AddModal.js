import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';



export default function AddModal({ inventory, setInventory, fetchInventory, fetchSFSPatrickInventory, fetchSFSCapeInventory  }) {
  const [AddModalOpen, setAddModalOpen] = useState(false); //Event Handler for Add Modal 
  const [addedItem, setAddedItem] = useState({
    item_name: '',
    brand: '-',
    nsn: '-',
    item_size: '-',
    gender: '-',
    building: '',
    aisle: '',
    item_count: 0,
    minimum_count: 0,
    count_status: '',
    ordered: 0,
    intial_gear: '',
    returnable_item: '',
    courier: '',
    tracking: '',
    contact: '',
    initial: '',
  })

  const options = [
    { label: 'Yes'},
    { label: 'No'},
  ];
  const [initialValue, setInitialValue] = useState(''); //value state for users drop down



const handleAddOpen = () => setAddModalOpen(true);
const handleCloseAddModal = () => setAddModalOpen(false);

/**
 * adds a new item to the DEMO TABLE based on the state set from the textfields
 */
const addItemToInventory = async () => {
  const newInventory = addedItem;
  console.log("NEWWWWWWWInventory", newInventory)
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


    /**
   * adds a new item to the 45 SFS PATRICK TABLE based on the state set from the textfields
   */
    const addItemToSFSPatrickInventory = async () => {
      const newInventory = addedItem;
      console.log("NEWWWWWWWInventory", newInventory)
      axios.post('http://localhost:3000/45sfspatrickinventory', { item: newInventory })
        .then(res => {
          if (res.status === 200) {
            setInventory([...inventory, newInventory])
            // fetchSFSPatrickInventory()
            setAddModalOpen(false)
          }
        })
        .catch(err => {
          alert('Sorry! Something went wrong. Please try again.')
          console.log('err', err);
        })
    };

        /**
   * adds a new item to the 45 SFS CAPE TABLE based on the state set from the textfields
   */
        const addItemToSFSCapeInventory = async () => {
          const newInventory = addedItem;

        console.log("THISSSSSSSS")
          axios.post('http://localhost:3000/45sfscapeinventory', { item: newInventory })
            .then(res => {
              if (res.status === 200) {
                setInventory([...inventory, newInventory])
                // fetchSFSCapeInventory()
                setAddModalOpen(false)
              }
            })
            .catch(err => {
              alert('Sorry! Something went wrong. Please try again.')
              console.log('err', err);
            })
        };


  const location = useLocation();//REact Router Hooked used to bring in the state of selected user and set the title of the page

  const handleInitialValue = (e) => {
    setAddedItem({ ...addedItem, intial_gear: e.target.value })
  };

  const handleReturnableValue = (e) => {
    setAddedItem({ ...addedItem, returnable_item: e.target.value })
  };



  return (
    <div>
      <Box sx={{ ml: 15, mt: 1 }}>
      <Tooltip title='Add Item to Inventory' placement="top">
        <Button variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddOpen}
          color='secondary'
        >
          ADD ITEM
        </Button>
      </Tooltip>
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
          // border: '3px solid',
          borderRadius: '16px',
          boxShadow: "0px 2px 0px 0px #4CAF50,0px 2px 25px 5px #4CAF50",
          p: 4,
          // borderColor: "#58D407"
        }} >
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Item
            </Typography>
          </Box>
          <Box
            id="modal-modal-description"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "15ch", }, mt: 2, ml: 2
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
            <Stack direction="row" spacing={2}>
            <Box sx={{ minWidth: 120, ml: 1, mt:1 }}>
                  <FormControl sx={{width: 135}}>
                    <InputLabel id="demo-simple-select-label">Initial Gear</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={addedItem.intial_gear}
                      label="Initial"
                      onChange={handleInitialValue}
                    >
                      <MenuItem value={'Yes'}>Yes</MenuItem>
                      <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                  </FormControl>
            </Box>

            <Box >
                  <FormControl sx={{width: 135, mt: 1}}>
                    <InputLabel id="demo-simple-select-label">Returnable</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={addedItem.returnable_item}
                      label="Initial"
                      onChange={handleReturnableValue}
                    >
                      <MenuItem value={'Yes'}>Yes</MenuItem>
                      <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                  </FormControl>
            </Box>
            </Stack>
            </div>
          </Box>
        
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mr: 1 }}>
            <Stack direction="row" spacing={2}>
              <Button
                color='secondary'
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCloseAddModal}
              >
                Cancel
              </Button>

              {location.state.warehouse === "45 SFS - Patrick"  ? (
              <Button color='secondary' variant="contained" startIcon={<SaveIcon />} 
              onClick={() => {addItemToSFSPatrickInventory()
                window.location.reload()
              }}>
                Submit
              </Button>
              ) : location.state.warehouse === "45 SFS - Cape" ? (
                <Button color='secondary' variant="contained" startIcon={<SaveIcon />} 
                onClick={() => {addItemToSFSCapeInventory()
                  window.location.reload()
              }}>
                  Submit
                </Button> 
              ) : (
                <h3>NO WAREHOUSE</h3>
                )
              }
{/* 
              <Button color='secondary' variant="contained" startIcon={<SaveIcon />} 
              onClick={() => addItemToInventory()}>
                Submit
              </Button> */}

            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}