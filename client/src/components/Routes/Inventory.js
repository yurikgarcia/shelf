import React, { useState, useEffect, useContext } from "react";
// import AddCart from "..//Buttons/AddCart.js";
import axios from "axios";
import AddModal from "../Buttons/AddModal.js";
import AppContext from "../AppContext.js";
import AppContext2 from "../AppContext2.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InventoryTable from "../Tables/InventoryTable.js";
import FSS45_Bowling from "../Tables/FSS45_Bowling.js";
import SFS_Cape from "../Tables/SFS_Cape.js";
import SFS_Patrick from "../Tables/SFS_Patrick.js";
import SFS_S6 from "../Tables/sfs45s6.js";
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';
import warehouse from "..//Images/warehouse.gif";


function Inventory({ shoppingCart, setShoppingCart }) {
  const [inventory, setInventory] = useState([]); //inventory state
  const [SFSCapeInventory, setSFSCapeInventory] = useState([]); //inventory state
  const [SFSPatrickInventory, setSFSPatrickInventory] = useState([]); //inventory state
  const [SFSs6Inventory, setSFSs6Inventory] = useState([]); //inventory state
  const [FSS45BowlingInventory, setFSS45BowlingInventory] = useState([]); //inventory state
  const [spinner, setSpinner] = useState(false); //spinner state

  const { API } = useContext(AppContext);
  const selectedRows = useContext(AppContext2);

  // const { selectedRows} = useContext(AppContext);

  console.log("SSSSelectedRows", AppContext2.selectedRows);

 


  //initial call to grab inventory from DB on load
  useEffect(() => {
    fetchInventory();
    fetchSFSPatrickInventory();
    fetchSFSCapeInventory();
    fetchSFSs6Inventory();
    fetchFSS45BowlingInventory();
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

        //fetches 45 FSS Bowling Inventory
        const fetchFSS45BowlingInventory = async () => {
          setSpinner(true);
          axios
            .get(
              `${API.website}/45fssbowlinginventory`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authorization")}`,
                },
              }
            )
            .then((res) => {
              setFSS45BowlingInventory (res.data);
              setSpinner(false);
            })
            .catch((err) => {
              console.log(err);
              setSpinner(false);
            });
        };

        console.log('from Inventory', FSS45BowlingInventory)

  const location = useLocation();//React Router Hook used to bring in the state of selected user and set the title of the page

  // console.log("LOCAL WAREHOUSE", localStorage.getItem("selected_Warehouse"))

  const fireSwal = () => {
        let timerInterval
          Swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
        }

        // console.log("location.state.warehouse", location.state.warehouse)
  return (
    <div>
      <div>
        <main>
          {selectedRows}
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
              SFSs6Inventory={SFSs6Inventory}
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
            ) : location.state.warehouse === "45 FSS - Bowling" ? (
              <FSS45_Bowling
              inventory={FSS45BowlingInventory}
              fetchFSS45BowlingInventory ={fetchFSS45BowlingInventory}
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
