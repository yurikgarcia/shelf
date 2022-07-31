
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import React from "react";
import homePage from '..//Images/homePage.jpg'



function Home() {

  

  
  return (
    <div>
      <Box 
      sx={{display:'flex', flexDirection:'row'}}
      >
        <Box
        sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}
        >
          <Box sx={{ mt: 15, ml:4}}>
            <div>
              <h1>Welcome to Shelf!</h1>
              {/* <h3>An inventory management software that allows you to enter 
                every key detail of your inventory and effortlessly manage your 
                assets digitally, whether you’re in the warehouse or on the go.
              </h3> */}
            </div>
          </Box>

          <Box sx={{ml:15, display:'flex', alignItems:'center'}}>
              <h2>An inventory management applications that effortlessly manages your 
                assets digitally, whether you’re in the warehouse or on the go!
              </h2>
          </Box>

          <Box 
          sx={{mt:2, mr:16}}
          >
            <Button 
              color='secondary' 
              variant="contained" 
              // startIcon={<SaveIcon />} 
              // onClick={() => addUserToUserTable()}
              >
                  Inventory
            </Button>
          </Box>
        </Box>



        <Box
        sx={{display:'flex', justifyContent:'flex-end', mt: 2, ml:10}}
        >
            <img alt="home page" src={homePage} width='1250' height='600'/>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
