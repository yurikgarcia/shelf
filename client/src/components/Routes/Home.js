
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import React, { useEffect } from "react";
import homePage from '..//Images/homePage.jpg'
import WebFont from 'webfontloader';



function Home() {

  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Arvo' ]
      }
    });
  }, []);
  
  return (
    <div>
      <Box 
      sx={{display:'flex', flexDirection:'row', display:'flex', justifyContent:'center',
            alignItems:'center', }}>
        <Box
          sx={{
            display:'flex', 
            flexDirection:'column', 
            justifyContent:'center', 
            alignItems:'center', 
            width:'30%',
            fontFamily:'Arvo',
          }}
        >
          <Box sx={{ mt: 10, ml:15, fontSize: 100, height: '0%',}}>
            <div>
              <p>Welcome to Shelf!</p>
              {/* <h3>An inventory management software that allows you to enter 
                every key detail of your inventory and effortlessly manage your 
                assets digitally, whether you’re in the warehouse or on the go.
              </h3> */}
            </div>
          </Box>

          <Box sx={{ml:15, display:'flex', alignItems:'center', fontSize: 20, fontFamily:'Arvo '}}>
              <h2>An inventory management application that effortlessly manages your 
                assets digitally, whether you’re in the warehouse or on the go!
              </h2>
          </Box>

          <Box 
          sx={{mt:2, mr:1}}
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
            <img alt="home page" src={homePage} width='1500' height='750'/>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
