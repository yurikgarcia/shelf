import React, { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext.js";
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import axios from "axios";
import Box from "@mui/material/Box";
import { ButtonGroup } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {useLocation } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Typography from "@mui/material/Typography";
import warehouse from "..//Images/warehouse.gif";

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
          {showPopper && (
            <Popper
      open={showFullCell && anchorEl !== null}
      anchorEl={anchorEl}
      style={{ width, marginLeft: -17 }}
    >
<Paper
        elevation={1}
        style={{
          whiteSpace: 'normal',
          display: 'inline-block',
          width: '100%',
          backgroundColor: '#f8f8f8',
          border: '1px solid #ccc'
        }}
      >
    <div style={{ whiteSpace: 'normal', display: 'inline-block', width: '100%' }}>
      <Typography
        variant="body2"
        style={{ padding: 8, display: 'block', width: '100%' }}
        overflow="auto"
      >
        {value}
      </Typography>
    </div>
  </Paper>
</Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.string,
};

export default function RowsGrid({ }) {


  const [adminWarehouses, setAdminWarehouses] = React.useState([]);//warehouses admin has access to
  const [currentShoppingCart, setCurrentShoppingCart] = useState([]); //shopping cart state
  const [spinner, setSpinner] = useState(false); //spinner state
  const [user, setUser] = useState([]); //selected user state
  const location = useLocation(); //React Router Dom hook used to pull the dod_id from the URL
  const selectedUserDodId = location.state.DoD //Pulling Dod ID from location to use as param for SQL calls
  const user_dod = localStorage.getItem("user_dod"); //Pulling Dod ID from local storage to use as param for SQL calls
  const [newShoppingCart, setNewShoppingCart] = useState([]); //shopping cart state
  const { API } = useContext(AppContext);

  useEffect(() => {
    fetchCurrentShoppingCart();
    fetchLoggedAdminWarehouses();
    fetchNewShoppingCart();
    fetchUsers2();
    if (localStorage.getItem("authorization") === null)
      window.location.href = "/login";
  }, []);



          /**
     * fetches the logged in user's warehouses from the DB
     */
          const fetchLoggedAdminWarehouses = async () => {
            let adminID = localStorage.user_dod
            axios
            .get(`${API.website}/admin-warehouses/${adminID}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authorization")}`,
              },
            })
            .then((res) => {
              setAdminWarehouses(res.data);
              console.log("ADMIN WAREHOUSES", res.data[0].warehouse_access)
            })
            .catch((err) => { 
              console.log(err);
            });
          };


    const fetchCurrentShoppingCart = async () => {
      // setSpinner(true);
      axios
        .get(`${API.website}/shopping-cart/${user_dod}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
          },
        })
        .then((res) => {
          setCurrentShoppingCart(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

  //fetch that pulls the issues items of the selectedUserDodId from the db
  const fetchUsers = async () => {
    console.log("FETCHING USERS", selectedUserDodId)
    axios.get(`${API.website}/getselecteduser/${selectedUserDodId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    })
      .then(res => {
        setUser(res.data);
        setSpinner(false);
        console.log("RES.DATA", res.data)
      })
      .catch(err => {
        console.log(err);
        setSpinner(false);
      })
  };

  const fetchUsers2 = async () => {
    const selected = selectedUserDodId
    axios
      .get(`${API.website}/getselecteduser/${selected}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
      });
  };

  
      /**
   * shopping Cart fetch
   */
  const fetchNewShoppingCart = async () => {
    // setSpinner(true);
    axios
    .get(`${API.website}/shopping-cart/${user_dod}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
      })
      .then((res) => {
        setNewShoppingCart(res.data);
        // setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        // setSpinner(false);
      });
  };

  // console.log("SHOPPING CART", newShoppingCart)



  //function that iterates through the user array and returns the issued_items array as issuedItems
  const issuedItems = user.map((user) => {
      // console.log("USER inside issuedItems function", user)
      return user.issued_items;
    }
  );

  const flatItems = issuedItems?.flat();



    /**
   * adds to shopping cart column in the users table
   */

    const addToCart = async (params) => {
      let userShoppingCart = params.row;
      console.log("USER SHOPPING CART", userShoppingCart)
      axios
      .patch(`${API.website}/shopping-cart/${user_dod}`, userShoppingCart)
        .then((res) => {
          if (res.status === 200) {
            setNewShoppingCart([...newShoppingCart, userShoppingCart]);
            fetchCurrentShoppingCart();
          }
        })
        .catch((err) => {
          alert("Sorry! Something went wrong. Please try again.");
          console.log("err", err);
        });
      };

      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      
      
        const [openSnack, setOpenSnack] = React.useState(false);
      
      
        function TransitionLeft(props) {
          return <Slide {...props} direction="left" />;
        }
      
        const handleCloseSnack = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
              setOpenSnack(false);
        };
      
      
        const handleClick = (Transition) => () => {
          setTransition(() => Transition);
          setOpenSnack(true);
        };
      
      
  const [transition, setTransition] = React.useState(undefined)

  // function that maps over currentShoppingCart and returns the shopping_cart.UUIDfetch array as shoppingCart
  const shoppingCart = currentShoppingCart?.map((currentShoppingCart) => {
    return currentShoppingCart.shopping_cart;
    }
  );

  const availableWarehouses = adminWarehouses?.map(warehouse => warehouse?.warehouse_access?.map(warehouses => {
    return warehouses
  }))

  const flatWarehouses = availableWarehouses.flat()

// console.log("adminWarehouses issued items", flatWarehouses)

// console.log("CHECKER", flatWarehouses.some(warehouse => warehouse.Table === 'sfs45s6'))

// const adminWarehouse = [
//   {Name: '45 SFS - Cape', Table: 'sfs45_cape'},
//   {Name: '45 SFS - Patrick', Table: 'sfs45_patrick'},
//   {Name: '45 SFS - S6', Table: 'sfs45s6'}
//   ]
const [stupidCheck, setStupidCheck] = useState('')
  
//   write me a function name pleaseWork that if 'sfs45s6' is in the adminWarehouse array, then it sets stupidChecker to 'YES' and if it is not in the array, it sets stupidChecker to 'NO'

const pleaseWork = () => {
  if (flatWarehouses.some(warehouse => warehouse.Table === 'sfs45s6')) {
    setStupidCheck('YES')
    console.log('YES')
  } else {
    setStupidCheck('NO')
    console.log('No')
  }
}


console.log('DAMN YOU',flatWarehouses.some(warehouse => warehouse.Table === 'sfs45s6'))

// console.log("STUPID CHECK", stupidCheck)

  return (
    <div>
    {flatItems.length > 0 ? (
    <Box sx={{ width: "99%", boxShadow: 10 }} >
      {spinner ? (
        <div>
          <img alt="warehouse" src={warehouse} width="900" />
        </div>
      ) : (
        <div style={{ height: "77vh", width: "100%"}}>
          <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'First', sort: 'asc' }],
                  },
                  pagination: {
                    pageSize: 50,
                  },
                }}
                components={{ Toolbar: GridToolbar }}
                stopColumnsSorts={[{ field: "Delete", sortable: false }]}
                columns={[
                  { field: "Name", minWidth: 150, renderCell: renderCellExpand  },
                  { field: "Brand", minWidth: 130, renderCell: renderCellExpand  },
                  { field: "NSN", minWidth: 100, renderCell: renderCellExpand  },
                  { field: "Size", minWidth: 100, renderCell: renderCellExpand  },
                  { field: "Gender", minWidth: 100, renderCell: renderCellExpand  },
                  { field: "Quantity", minWidth: 100, renderCell: renderCellExpand  },
                  { field: "Issued", minWidth: 100, renderCell: renderCellExpand  },
                  { field: "Returnable", minWidth: 100, renderCell: renderCellExpand  },
                  { field: "Original", minWidth: 150, renderCell: renderCellExpand  },
                  { field: "Return",
                  renderCell: (params) => (
                    <div>
                  { flatWarehouses.some(warehouse => warehouse.Table === params.row.Original) ? (
                              <ButtonGroup>
                                {currentShoppingCart?.map((cart) => cart.shopping_cart?.some((item) => item.UUIDfetcha === params.row.uuidFetcha ) ? (
                                    <AssignmentReturnedIcon
                                    sx={{ cursor: "pointer", color: "#ff0000" }}
                                    onClick={handleClick(TransitionLeft)}
                                    />  
                                ) : (
                                    <AssignmentReturnedIcon 
                                    sx={{ cursor: "pointer", color: "#4CAF50" }}
                                      onClick={() => {
                                        addToCart(params)
                                        window.location.reload()
                                      }}
                                    />
                                ),)}
                              </ButtonGroup>
                    ) : null}
                    </div>
                  ),
                },
                ]}
                rows={flatItems?.map((row, index) => {
                  return {
                    id: index,
                    Name: row.Name,
                    Brand: row.Brand,
                    NSN: row.NSN,
                    Size: row.Size,
                    Quantity: row.Quantity,
                    Gender: row.Gender,
                    Returnable: row.Returnable,
                    UUID: row.UUID,
                    Count: row.Count,
                    Issued: row.Date,
                    uuidFetcha: row.UUIDfetcha,
                    Original: row.Original_warehouse,
                  };
                })}
              />
              <Snackbar
                open={openSnack} 
                autoHideDuration={3250} 
                onClose={handleCloseSnack}
                TransitionComponent={transition}  
                key={transition ? transition.name : ''}
                >
                <Alert  severity="warning" sx={{ width: '1000%' }}>
                  Item is already in Cart!
                </Alert>
              </Snackbar>              
            </div>
          </div>
        </div>
      )
      }
    </Box >
) : (
  <div>
  <Box sx={{mt: 10}}>
    <Box sx={{ display: 'flex', justifyContent:'center' }}>
              <img alt="warehouse" src={warehouse} width="600" />
    </Box>
    <Box sx={{ display: 'flex', justifyContent:'center' }}>
     <h1>Your issued items is currently empty.</h1>
    </Box>
  </Box>
</div>

)

}

</div>
  );
}