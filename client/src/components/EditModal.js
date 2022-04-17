import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";


export default function ReturnModal({ inventory, params }) {
  const [editedItem, setEditedItem] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    // console.log('params', params);
  }, []);



  return (
    <div>
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>    
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
          width: 425,
          bgcolor: 'background.paper',
          border: '3px solid',
          borderRadius: '16px',
          boxShadow: 19,
          p: 4,
          borderColor: '#f57c00'
        }} >
          <CardContent>
            <Box>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
                  Edit Details
                </Typography>
              </Box>
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
                  id="filled" å
                  variant="filled"
                  label="Name"
                  defaultValue="Radio Pouch"
                  sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                />
                <TextField
                  id="filled"
                  variant="filled"
                  label="NSN"
                  defaultValue="123456789"
                  sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                />
              </div>
              <div>
                <TextField
                  id="filled"
                  variant="filled"
                  label="Location"
                  defaultValue="994"
                  sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                />
                <TextField
                  id="filled"
                  variant="filled"
                  label="Size"
                  defaultValue="N/A"
                  sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                />
              </div>
              <div>
                <TextField
                  id="filled"
                  variant="filled"
                  label="On Hand"
                  defaultValue="37"
                  sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                />
                <TextField
                  id="filled"
                  variant="filled"
                  label="Minimum Count"
                  defaultValue="25"
                  sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                />
              </div>
              <div>
                <TextField
                  id="filled"
                  variant="filled"
                  label="Returnable Item"
                  defaultValue="Yes"
                  sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                />
                <TextField
                  id="filled"
                  variant="filled"
                  label="Ordered"
                  defaultValue="25"
                  sx={{ backgroundColor: "#ffb74d", borerRadius: '5' }}
                />
              </div>
            </Box>
          </CardContent>
          <CardActions>
            <Box sx={{ ml: 9, mt: 1 }}>
              <Stack direction="row" spacing={2}>
                <Button color='secondary' variant="contained" startIcon={<SaveIcon />}>
                  Save
                </Button>

                <Button color='secondary' variant="contained" startIcon={<CancelIcon />}>
                  Cancel
                </Button>
              </Stack>
            </Box>
          </CardActions>
        </Box>
      </Modal>
    </div>
  );
}