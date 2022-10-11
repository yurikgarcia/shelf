import React, { useState, useEffect } from "react";
import AddOrders from "../Buttons/AddOrders.js";
import Box from "@mui/material/Box";
import OrdersTable2 from "../Tables/OrdersTable2.js";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Orders2() {




  return (
    <div>
      <div>
        <main>
          <Box sx={{ ml: 15, mt: 2 }}>
            <h1>Orders *** THIS IS A DEMO - PENDING v.2 RELEASE</h1>
          </Box>

          {/* <Box sx={{ display: "flex", flexDirection: "row" }}>
            <AddOrderss
              inventory={inventory}
              setInventory={setInventory}
              fetchInventory={fetchInventory}
            />
          </Box> */}

          <Box sx={{ ml: 8, mt: 1 }}>
            <OrdersTable2/>
          </Box>

          {/* <Box sx={{ ml: 20, mt: 1 }}>
          <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
    </Box> */}
        </main>
      </div>
    </div>
  );
}

export default Orders2;
