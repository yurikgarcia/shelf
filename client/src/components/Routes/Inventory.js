import React, { useState, useEffect } from "react";
// import AddCart from "..//Buttons/AddCart.js";
import AddModal from "../Buttons/AddModal.js";
import Box from "@mui/material/Box";
import InventoryTable from "../Tables/InventoryTable.js";
import axios from "axios";
import QuantityError from "..//Buttons/quantityError.js";

function Inventory({ shoppingCart, setShoppingCart }) {
  const [inventory, setInventory] = useState([]); //inventory state
  const [spinner, setSpinner] = useState(false); //spinner state

  //initial call to grab inventory from DB on load
  useEffect(() => {
    fetchInventory();
    if (localStorage.getItem("authorization") === null)
      window.location.href = "/login";
  }, []);

  /**
   * @returns inventory
   * fetches DB after any changes to the resutls array from the user on the front end
   */
  const fetchInventory = async () => {
    setSpinner(true);
    axios
      .get(
        "http://localhost:3000/inventory" ||
          "https://postgres-apr.herokuapp.com/inventory",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
          },
        }
      )
      .then((res) => {
        setInventory(res.data);
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
      });
  };

  return (
    <div>
      <div>
        <main>
          <Box sx={{ ml: 15, mt: 2 }}>
            <h1>45th Security Forces: Bldg. 994</h1>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <AddModal
              inventory={inventory}
              setInventory={setInventory}
              fetchInventory={fetchInventory}
            />
          
            {/* <AddCart inventory={inventory} setInventory={setInventory} fetchInventory={fetchInventory}/>    */}
          </Box>

          <Box sx={{ ml: 8, mt: 1 }}>
            <InventoryTable
              inventory={inventory}
              fetchInventory={fetchInventory}
              spinner={spinner}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          </Box>
        </main>
      </div>
    </div>
  );
}

export default Inventory;
