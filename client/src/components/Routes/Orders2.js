import React, { useState, useEffect } from "react";
import AddOrders from "../Buttons/AddOrders.js";
import Box from "@mui/material/Box";
import OrdersTable2 from "../Tables/OrdersTable2.js";
import axios from "axios";

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
        </main>
      </div>
    </div>
  );
}

export default Orders2;
