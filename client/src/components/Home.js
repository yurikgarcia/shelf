import * as React from "react";
import Box from '@mui/material/Box';
import wh from './wh.gif'
import { flexbox } from "@mui/system";




function Home() {
  

  return (

    
    <div>
      <Box sx={{ml: 15, mt: 2}}>
        <div>
        <h1>Welcome to Shelf!</h1>
        {/* <Box sx={{display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'flex-end'
                  }}>
          <img src={wh} width='480' height='280'/>
        </Box> */}
        </div>
      </Box>
    </div>

  );
}

export default Home;