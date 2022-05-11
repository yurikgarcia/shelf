import * as React from 'react';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function ReturnModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>

      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
        sx={{ alignContent: 'flex-end', fontSize: 20, color: 'black'}}
        >
        <AssignmentReturnedIcon/>
      </Button>

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
          border: '4px solid #000',
          borderRadius: '16px',
          boxShadow: 19,
          p: 4,
          borderColor: "black", }} >

          <Typography id="modal-modal-title" variant="h6" component="h2" align="center" sx={{display:'flex', justifyContent:'center'}}>
            Are You Sure You Want To Return This Item To Shelf?
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Stack direction="row" spacing={2}>
                <Button color = 'secondary' variant="contained" startIcon={<AssignmentReturnedIcon />}>
                  Return
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
