import React, { useState, useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AppContext from "../AppContext.js";
// import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Box from '@mui/material/Box';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from "@mui/material/Divider";
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
    building: '-',
    aisle: '-',
    item_count: 0,
    minimum_count: 0,
    count_status: '',
    ordered: 0,
    intial_gear: '-',
    returnable_item: '-',
    courier: '-',
    tracking: '-',
    contact: '-',
    initial: '-',
  })

  const [handleNameError, setHandleNameError] = useState({
    item_name: '',
  })

  const [handleNSNError, setHandleNSNError] = useState({
    nsn: '',
  })

  const options = [
    { label: 'Yes'},
    { label: 'No'},
  ];
  // const [initialValue, setInitialValue] = useState(''); //value state for users drop down



const handleAddOpen = () => setAddModalOpen(true);
const handleCloseAddModal = () => setAddModalOpen(false);

const { API } = useContext(AppContext);

/**
 * adds a new item to the DEMO TABLE based on the state set from the textfields
 */
const addItemToInventory = async () => {
  const newInventory = addedItem;
  axios.post(`${API.website}/inventory`, { item: newInventory })
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
      axios.post(`${API.website}/45sfspatrickinventory`, { item: newInventory })
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
          axios.post(`${API.website}/45sfscapeinventory`, { item: newInventory })
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

  /**
   * adds a new item to the 45 SFS PATRICK TABLE based on the state set from the textfields
   */
       const addItemToSFSs6Inventory = async () => {
        const newInventory = addedItem;
        axios.post(`${API.website}/45sfss6inventory`, { item: newInventory })
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


  const location = useLocation();//REact Router Hooked used to bring in the state of selected user and set the title of the page

  const handleInitialValue = (e) => {
    setAddedItem({ ...addedItem, intial_gear: e.target.value })
  };

  const handleReturnableValue = (e) => {
    setAddedItem({ ...addedItem, returnable_item: e.target.value })
  };

  // const errorHandler = (e) => {
  //   addedItem.item_name.length == 0 ? setHandleErrors({...handleErrors, item_name: false}) : setHandleErrors({...handleErrors, item_name: true})
  // }

  const errorHandlerName = (e) => {
    console.log("NAME FIRE")
    addedItem.item_name.length === 0 ? setHandleNameError({...handleNameError, item_name: false}) : setHandleNameError({...handleNameError, item_name: true});
  }

  const errorHandlerNsn = (e) => {
    addedItem.nsn === '-' ? setHandleNSNError({...handleNSNError, nsn: false}) : setHandleNSNError({...handleNSNError, nsn: true});
  }


  console.log("errorNAMEHandler", handleNameError)


//   console.log("errorNSNHandler", handleNameError)


// console.log('addedItem', addedItem.nsn)
console.log('addedNAMEItem', addedItem.item_name.length)


  return (
    <div>
      <Box>
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
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{display: 'flex', justifyContent: 'center'}}>
              Add New Item to {location.state.warehouse}
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
              {handleNameError.item_name === false ?
              <TextField
                id="outlined-error"
                label="Name"
                required={true}
                error={true}
                onChange={(e) => setAddedItem({ ...addedItem, item_name: e.target.value })}
              />
              :
              <TextField
              id="outlined-error"
              label="Name"
              required={true}
              onChange={(e) => setAddedItem({ ...addedItem, item_name: e.target.value })}
            />}

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
              <TextField
                id="outlined-error-helper-text"
                label="Gender"
                onChange={(e) => setAddedItem({ ...addedItem, gender: e.target.value })}
              />
            </div>
            <Divider sx={{  bgcolor: "#155E9C", borderBottomWidth: 3 }}/> 
            <div>
              <TextField
                id="outlined-error-helper-text"
                label="Building"
                onChange={(e) => setAddedItem({ ...addedItem, building: e.target.value })}
              />
              <TextField
                id="outlined-error-helper-text"
                label="Aisle"
                onChange={(e) => setAddedItem({ ...addedItem, aisle: e.target.value })}
              />
            </div>
            <Divider sx={{  bgcolor: "#155E9C", borderBottomWidth: 3 }}/> 
            <div>
              <TextField
                id="outlined-error-helper-text"
                label="Item Count"
                placeholder='Number'
                type="number"
                onChange={(e) => setAddedItem({ ...addedItem, item_count: e.target.value })}
              />
              <TextField
                id="outlined-error-helper-text"
                label="Minimum Count"
                placeholder='Number'
                type="number"
                onChange={(e) => setAddedItem({ ...addedItem, minimum_count: e.target.value })}
              />
            </div>
            <div>
              <TextField
                id="outlined-error-helper-text"
                label="Ordered"
                placeholder='Number'
                type="Number"
                onChange={(e) => setAddedItem({ ...addedItem, ordered: e.target.value })}
              />
              {/* <TextField
                id="outlined-error-helper-text"
                label="Courier"
                onChange={(e) => setAddedItem({ ...addedItem, courier: e.target.value })}
              /> */}
              <TextField
                id="outlined-error-helper-text"
                label="Tracking"
                onChange={(e) => setAddedItem({ ...addedItem, tracking: e.target.value })}
              />
            </div>
            <Divider sx={{  bgcolor: "#155E9C", borderBottomWidth: 3 }}/> 
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

              {addedItem.item_name.length > 0 ? (

                <ButtonGroup>
                  {location.state.warehouse === "45 SFS - Patrick"  ? (
                    <Button color='secondary' variant="contained" startIcon={<SaveIcon />} 
                      onClick={() => {
                        addItemToSFSPatrickInventory()
                        window.location.reload()
                      }}>
                      Submit
                    </Button>
                  ) : location.state.warehouse === "45 SFS - Cape" ? (
                    <Button color='secondary' variant="contained" startIcon={<SaveIcon />} 
                      onClick={() => {
                        addItemToSFSCapeInventory()
                        window.location.reload()
                      }}>
                      Submit
                    </Button> 
                  ) : location.state.warehouse === "45 SFS - S6" ? (
                    <Button color='secondary' variant="contained" startIcon={<SaveIcon />} 
                      onClick={() => {
                        addItemToSFSs6Inventory()
                        window.location.reload()
                      }}>
                      Submit
                    </Button> 
                  )
                  : null}
                </ButtonGroup>
              ) : (
                <Button color='secondary' variant="contained" startIcon={<SaveIcon />}
                  onClick={() => {
                    errorHandlerName()
                    errorHandlerNsn()
                  }}>
                  Submit
                </Button>
              )}


            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}


{/* <Button color='secondary' variant="contained" startIcon={<SaveIcon />}
                  onClick={() => {
                  errorHandlerName()
                  errorHandlerNsn()
                }}>
                ERROR
                </Button> */}