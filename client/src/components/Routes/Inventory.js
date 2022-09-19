import React, { useState, useEffect } from "react";
// import AddCart from "..//Buttons/AddCart.js";
import AddModal from "../Buttons/AddModal.js";
import Box from "@mui/material/Box";
import SFS_Cape from "../Tables/SFS_Cape.js";
import SFS_Patrick from "../Tables/SFS_Patrick.js";
import InventoryTable from "../Tables/InventoryTable.js";
import axios from "axios";
import { useLocation } from 'react-router-dom';


function Inventory({ shoppingCart, setShoppingCart }) {
  const [inventory, setInventory] = useState([]); //inventory state
  const [SFSCapeInventory, setSFSCapeInventory] = useState([]); //inventory state
  const [SFSPatrickInventory, setSFSPatrickInventory] = useState([]); //inventory state
  const [spinner, setSpinner] = useState(false); //spinner state

  //initial call to grab inventory from DB on load
  useEffect(() => {
    fetchInventory();
    fetchSFSPatrickInventory();
    fetchSFSCapeInventory();
    if (localStorage.getItem("authorization") === null)
      window.location.href = "/login";
  }, []);

  /**
   * @returns DEMO inventory
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

  //fetches 45 SFS Patrick Inventory
  const fetchSFSPatrickInventory = async () => {
    setSpinner(true);
    axios
      .get(
        "http://localhost:3000/45sfspatrickinventory",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
          },
        }
      )
      .then((res) => {
        setSFSPatrickInventory (res.data);
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
      });
  };

    //fetches 45 SFS Patrick Inventory
    const fetchSFSCapeInventory = async () => {
      setSpinner(true);
      axios
        .get(
          "http://localhost:3000/45sfscapeinventory",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            },
          }
        )
        .then((res) => {
          setSFSCapeInventory (res.data);
          setSpinner(false);
        })
        .catch((err) => {
          console.log(err);
          setSpinner(false);
        });
    };

  const location = useLocation();//REact Router Hooked used to bring in the state of selected user and set the title of the page

  console.log("location from nav selection", location);
  console.log("PATRICK", SFSPatrickInventory);

  console.log("CAPE", SFSCapeInventory)

  return (
    <div>
      <div>
        <main>
          <Box sx={{ ml: 15, mt: 2 }}>
            <h1>{location.state.warehouse}</h1>
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
            {location.state.warehouse  
            === "45 SFS - Patrick" ? (
              <SFS_Patrick
                inventory={SFSPatrickInventory}
                fetchSFSPatrickInventory ={fetchSFSPatrickInventory}
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />
            ) : location.state.warehouse === "45 SFS - Cape" ? (
              <SFS_Cape
              inventory={SFSCapeInventory}
              fetchSFSCapeInventory ={fetchSFSCapeInventory}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
            ) : (
            <Box sx={{ ml: 8, mt: 1 }}>
              <h1>Currently working on installing the 45 SFS Cape Warehouse</h1>
            </Box>
            )}
          </Box>
{/* 
          <Box sx={{ ml: 8, mt: 1 }}>
            <SFS_Patrick
              inventory={SFSPatrickInventory}
              setInventory={setSFSPatrickInventory}
              fetchInventory={fetchSFSPatrickInventory}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          </Box> */}
        </main>
      </div>
    </div>
  );
}


          // <Box sx={{ ml: 8, mt: 1 }}>
          //   <InventoryTable
          //     inventory={inventory}
          //     fetchInventory={fetchInventory}
          //     spinner={spinner}
          //     shoppingCart={shoppingCart}
          //     setShoppingCart={setShoppingCart}
          //   />
          // </Box> 


export default Inventory;
