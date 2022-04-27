import React, { useState, useEffect } from 'react';
import AddModal from "./AddModal.js";
import Box from '@mui/material/Box';
import CheckoutDrawer from "./CheckoutDrawer.js";
import InventoryTable from "./InventoryTable.js";
import axios from 'axios';

function Inventory() {
  const [inventory, setInventory] = useState([]); //inventory state
  const [spinner, setSpinner] = useState(false); //spinner state

  //initial call to grab inventory from DB on load
  useEffect(() => {
    fetchInventory();
  }, []);

  /**
   * @returns inventory
   * fetches DB after any changes to the resutls array from the user on the front end
   */
  const fetchInventory = async () => {
    setSpinner(true);
    axios.get('http://localhost:3000/inventory' || 'https://postgres-apr.herokuapp.com/inventory')
      .then(res => {
        setInventory(res.data);
        setSpinner(false);
      })
      .catch(err => {
        console.log(err);
        setSpinner(false);
      })
  };

  return (
    <div>
      <div>
        <main>
        <Box sx={{ml: 15, mt: 2}}>
            <h1>Current Inventory</h1>
          </Box>

          <Box sx={{display:"flex", flexDirection: 'row'}}>
              <AddModal inventory={inventory} setInventory={setInventory} fetchInventory={fetchInventory}/>

              <CheckoutDrawer sx={{display:"flex", alignContent: 'center', pt:1}} />          
          </Box>

          <Box sx={{ ml: 8, mt: 1 }}>
            <InventoryTable inventory={inventory} fetchInventory={fetchInventory} spinner={spinner}/>
          </Box>
        </main>
      </div>
    </div>

  );
}

export default Inventory;