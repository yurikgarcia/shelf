import * as React from 'react';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ReturnModal({ inventory }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>

      <Button onClick={handleOpen}> Details </Button>

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
            width: 500,
            bgcolor: 'background.paper',
            border: '4px solid #000',
            borderRadius: '16px',
            boxShadow: 19,
            p: 4,
            borderColor: "black", }} >
        <CardContent>
                <Box>
                  <div>
                      <Box sx={{mb: 2}}>
                        <Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
                            Details
                          </Typography>
                      </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row' }}>
                      <Box>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Name
                        </Typography>
                        <Typography variant="h6" component="div">
                          Radio Pouches
                        </Typography>
                      </Box>
                      <Box sx={{ml: 4}}> 
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          NSN
                        </Typography>
                        <Typography variant="h6" component="div">
                        1324171354
                        </Typography>
                      </Box>
                      <Box sx={{ml: 3}}> 
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Location
                        </Typography>
                        <Typography variant="h6" component="div">
                          993
                        </Typography>
                      </Box>
                      <Box sx={{ml: 4}}> 
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Size
                        </Typography>
                        <Typography variant="h6" component="div">
                          N/A
                        </Typography>
                      </Box>
                    </Box>
                  </div>

                  <div>
                  <Box sx={{display: 'flex', flexDirection: 'row', mt: 1 }}>
                      <Box> 
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          On Hand
                        </Typography>
                        <Typography variant="h6" component="div">
                          37
                        </Typography>
                      </Box>
                      <Box sx={{ml: 4}}> 
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Minimum Count
                        </Typography>
                        <Typography variant="h6" component="div">
                          25
                        </Typography>
                      </Box>
          
                      <Box sx={{ml: 4}}> 
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Ordered
                        </Typography>
                        <Typography variant="h6" component="div">
                          0
                        </Typography>
                      </Box>
                      <Box sx={{ml: 4}}> 
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Returnable Item
                        </Typography>
                        <Typography variant="h6" component="div">
                          Yes
                        </Typography>
                      </Box>
                    </Box>
                  </div>
              </Box>
            </CardContent>
          </Box>
        </Modal>
    </div>
  );
}