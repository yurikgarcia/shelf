import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function ReturnModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>

      <Button onClick={handleOpen}> Delete </Button>

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
          width: 400,
          bgcolor: 'background.paper',
          border: '6px solid #000',
          borderRadius: '16px',
          boxShadow: 19,
          p: 4,
          borderColor: "#c62828", }} >

          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{display:'flex', justifyContent:'center'}}>
            Are You Sure You Want To Delete?
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            Data from this item will be <Typography variant="h5" > PERMENENTLY </Typography> DELETED!
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Stack direction="row" spacing={2}>
                <Button color = 'secondary' variant="contained" startIcon={<DeleteIcon />}>
                  Delete
                </Button>

                <Button color = 'secondary'  variant="contained" startIcon={<CancelIcon />}>
                  Cancel
                </Button>
              </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}