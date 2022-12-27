
import Box from "@mui/material/Box";

import React, { useEffect } from "react";
import homePage from '..//Images/homePage.jpg'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import WebFont from 'webfontloader';

let theme = createTheme();
theme = responsiveFontSizes(theme);


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
      <ThemeProvider theme={theme}>
      <Box
      sx={{ flexDirection:'row', display:'flex', justifyContent:'center',
            alignItems:'center', }}>
        <Box
          sx={{
            display:'flex', 
            flexDirection:'column', 
            justifyContent:'center', 
            alignItems:'center', 
            width:'100%',
            fontFamily:'Arvo',
          }}
        >
          <Box sx={{ mt: 10 }}>
            <div>
            <Typography variant="h3">Welcome to Shelf! </Typography>
            </div>
          </Box>

          <Box sx={{
                display:'flex', 
                alignItems:'center', 
                fontFamily:'Arvo ', 
                width: '50%', 
                mt: 1, 
                flexWrap: 'wrap' 
                }}>
            <Typography variant="h5"> An inventory management application that effortlessly manages your 
                  assets digitally, whether you’re in the warehouse or on the go! </Typography>
          </Box>
        </Box>
      </Box>
          </ThemeProvider>

        {/* <Box
          sx={{display:'flex', justifyContent:'flex-end', mt: 2, ml:10, flexGrow: 1}}
          >
            <img alt="home page" src={homePage} width='1500' height='750'/>
        </Box> */}
    </div>
  );
}

export default Home;
