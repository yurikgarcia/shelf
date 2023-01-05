import React, { useState, useEffect, useContext } from "react";
// import AddCart from "..//Buttons/AddCart.js";
import axios from "axios";
import AddModal from "../Buttons/AddModal.js";
import AppContext from "../AppContext.js";
import Box from "@mui/material/Box";
import InventoryTable from "../Tables/InventoryTable.js";
import SFS_Cape from "../Tables/SFS_Cape.js";
import SFS_Patrick from "../Tables/SFS_Patrick.js";
import SFS_S6 from "../Tables/sfs45s6.js";
import { useLocation } from 'react-router-dom';
import warehouse from "..//Images/warehouse.gif";


function Inventory({ shoppingCart, setShoppingCart }) {
  const [inventory, setInventory] = useState([]); //inventory state
  const [SFSCapeInventory, setSFSCapeInventory] = useState([]); //inventory state
  const [SFSPatrickInventory, setSFSPatrickInventory] = useState([]); //inventory state
  const [SFSs6Inventory, setSFSs6Inventory] = useState([]); //inventory state
  const [spinner, setSpinner] = useState(false); //spinner state

  const { API } = useContext(AppContext);


  //initial call to grab inventory from DB on load
  useEffect(() => {
    fetchInventory();
    fetchSFSPatrickInventory();
    fetchSFSCapeInventory();
    fetchSFSs6Inventory();
    if (localStorage.getItem("authorization") === null)
      window.location.href = "/login";
  }, []);

  /**
   * @returns DEMO inventory
   * fetches DB after any changes to the results array from the user on the front end
   */
  const fetchInventory = async () => {
    setSpinner(true);
    axios
      .get(
        `${API.website}/inventory`,
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
    console.log("fetching 45 SFS Patrick Inventory")
    setSpinner(true);
    axios
      .get(
        `${API.website}/45sfspatrickinventory`,
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

    //fetches 45 SFS Cape Inventory
    const fetchSFSCapeInventory = async () => {
      setSpinner(true);
      axios
        .get(
          `${API.website}/45sfscapeinventory`,
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

        //fetches 45 SFS S6 Inventory
        const fetchSFSs6Inventory = async () => {
          console.log ("fetching s6 inventory")
          setSpinner(true);
          axios
            .get(
              `${API.website}/45sfss6inventory`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authorization")}`,
                },
              }
            )
            .then((res) => {
              setSFSs6Inventory (res.data);
              setSpinner(false);
            })
            .catch((err) => {
              console.log(err);
              setSpinner(false);
            });
        };

  const location = useLocation();//React Router Hook used to bring in the state of selected user and set the title of the page

  // console.log("location from inv", location.state.warehouse.length)
  console.log("PATRICK", SFSPatrickInventory);

  // console.log("CAPE", SFSCapeInventory)

  console.log("S6", SFSs6Inventory)

  return (
    <div>
      <div>
        <main>
        <Box sx={{ display: 'flex', ml:1, flexDirection: 'column', width: '99%'}}>
          <Box sx={{ ml:3}}>
            <h1>{location.state.warehouse}</h1>
          </Box>
          <Box sx={{display:"flex", justifyContent: 'flex-start'}}>
          {location.state.warehouse.length !== 0 ? (
            <AddModal
              inventory={inventory}
              setInventory={setInventory}
              fetchInventory={fetchInventory}
            /> ) : null}
          </Box>
          <Box>
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
            ) : location.state.warehouse === "45 SFS - S6" ? (
              <SFS_S6
              inventory={SFSs6Inventory}
              fetchSFSs6Inventory ={fetchSFSs6Inventory}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            /> ) : (
            <Box sx={{ display: 'flex', justifyContent:'center', mt: 1 }}>
              <img alt="warehouse" src={warehouse} width="900" />
            </Box>
            )}
          </Box>
        </Box>
        </main>
      </div>
    </div>
  );
}

export default Inventory;
