import * as React from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';



export default function DetailsCard() {

  return (

<div>
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


    {/* <CardActions>
      <Box sx={{ml: 1, mt:1}}>      
          <Button color = 'secondary' variant="contained" 
          startIcon={<EditIcon />}
          onClick={handleEditOpen}
          >
          Edit
          </Button>
        </Box>
    </CardActions> */}


</div>
  );
}