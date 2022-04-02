import * as React from "react";
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckoutDrawer from "./CheckoutDrawer.js";
import InventoryTable from "./InventoryTable.js";
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';



function Inventory() {

      //Event Handler for Add Modal 
      const [AddModalOpen, setAddModalOpen] = React.useState(false);
      const handleAddOpen = () => setAddModalOpen(true);
      const handleCloseAddModal = () => setAddModalOpen(false);
  

  return (


<div>

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
          border: '6px solid #000',
          borderRadius: '16px',
          boxShadow: 19,
          p: 4,
          borderColor: "#58D407"}} >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Item
          </Typography>
        <Box/>

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
        />
        <TextField
          id="outlined-error-helper-text"
          label="NSN"
        />
      </div>
      <TextField
        id="outlined-error-helper-text"
        label="Location"
      />
      <TextField
          id="outlined-error-helper-text"
          label="Size"
        />
      <div>
      <TextField
        id="outlined-error-helper-text"
        label="On Hand"
      />
        <TextField
          id="outlined-error-helper-text"
          label="Minimum Count"
        />

      <TextField
        id="outlined-error-helper-text"
        label="Ordered"
      />
        

        <TextField
          id="outlined-error"
          label="Returnable Item"
        />
        {/* <TextField
          id="outlined-error-helper-text"
          label="Deployment Gear"
        /> */}
        </div>
      </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Stack direction="row" spacing={2}>
                <Button color = 'secondary' variant="contained" startIcon={<SaveIcon />}>
                  Save
                </Button>

                <Button 
                  color = 'secondary'  
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




  
    <div>
      <main>

      <Box sx={{ml: 15, mt: 2}}>
        <h1>Current Inventory</h1>
      </Box>

      <Box sx={{mt: 2, ml: 165}}>
        <CheckoutDrawer/>
      </Box>

      <Box sx={{ml: 8, mt:1}}>
        <InventoryTable/>
      </Box>

      <Box sx={{ml: 15, mt:1}}>      
        <Button  variant="contained" 
        startIcon={<AddIcon />}
        onClick={handleAddOpen}
        >
        Add
        </Button>
      </Box>

    </main>
  </div>
</div>

  );
}

export default Inventory;