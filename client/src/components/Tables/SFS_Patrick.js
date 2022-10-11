import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Modal from "@mui/material/Modal";
import QuantityError from "../Buttons/quantityError.js";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import warehouse from "..//Images/warehouse.gif";
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

export default function RowsGrid({
  fetchSFSPatrickInventory,
  inventory,
  fetchInventory,
  spinner,
  setSpinner,
  shoppingCart,
  setShoppingCart,
}) {
  const [newShoppingCart, setNewShoppingCart] = useState([]); //shopping cart state
  const [currentShoppingCart, setCurrentShoppingCart] = useState([]); //shopping cart state
  const user_dod = localStorage.getItem("user_dod");
  const [editedItem, setEditedItem] = useState({
    Name: "",
    Brand: "",
    NSN: "",
    Bldg: "",
    Size: "-",
    Count: 0,
    Gender: "-",
    Aisle: "",
    Initial: "",
    MinCount: 0,
    Ordered: 0,
    Returnable: false,
    Courier: "-",
    Tracking: "-",
  });



  const [newValue, setNewValue] = useState({
    Delete: "",
    Name: "",
    Brand: "",
    NSN: "",
    Bldg: "",
    Size: "-",
    Count: 0,
    Gender: "-",
    Aisle: "",
    Initial: "",
    MinCount: 0,
    Ordered: "",
    Returnable: true,
    Courier: "-",
    Tracking: "-",
    Original: ""
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const onDelete = async (params) => {
    let id = params.formattedValue;
    axios({
      method: "delete",
      url:
        "http://localhost:3000/45sfspatrickinventory",
      data: {
        id: id,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          fetchSFSPatrickInventory();
        }
      })
      .catch((err) => {
        alert("Sorry! Something went wrong. Please try again.");
        console.log("err", err);
      });
  };

  const onEditOpen = (params) => {
    setEditedItem(params.row);
    setNewValue(params.row);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    axios({
      method: "patch",
      url:
        "http://localhost:3000/45sfspatrickinventory",
      data: {
        Delete: newValue.Delete,
        Name: newValue.Name,
        Brand: newValue.Brand,
        NSN: newValue.NSN,
        Bldg: newValue.Bldg,
        Size: newValue.Size,
        Count: newValue.Count,
        Gender: newValue.Gender,
        Aisle: newValue.Aisle,
        Initial: newValue.Initial,
        MinCount: newValue.MinCount,
        Ordered: newValue.Ordered,
        Returnable: newValue.Returnable,
        Courier: newValue.Courier,
        Tracking: newValue.Tracking,
      },
    })
      .then(() => {
        console.log("success");
        fetchSFSPatrickInventory();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };


  /**
   * adds to shopping cart column in the users table
   */

    let currentDate = new Date().toISOString().split('T')[0];// current date to be used in the shopping cart

    const addToCart = async (params) => {
      let userShoppingCart = params.row;
      axios
      .patch(`http://localhost:3000/shopping-cart/${user_dod}/${currentDate}`, userShoppingCart)
        .then((res) => {
          if (res.status === 200) {
            setNewShoppingCart([...newShoppingCart, userShoppingCart]);
            fetchInventory();
            fetchNewShoppingCart();
          }
        })
        .catch((err) => {
          alert("Sorry! Something went wrong. Please try again.");
          console.log("err", err);
        });
      };



  // initial call to grab inventory from DB on load
  useEffect(() => {
    fetchNewShoppingCart();
  }, []);

  /**
   * shopping Cart fetch
   */
  const fetchNewShoppingCart = async () => {
    // setSpinner(true);
    axios
      .get("http://localhost:3000/users", {
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

    //initial call to grab inventory from DB on load
    useEffect(() => {
      fetchCurrentShoppingCart();
    }, []);

    // /**
  //  * shopping Cart fetch
  //  */
  const fetchCurrentShoppingCart = async () => {
    // setSpinner(true);
    axios
      .get(`http://localhost:3000/shopping-cart/${user_dod}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
      })
      .then((res) => {
        setCurrentShoppingCart(res.data);
        // setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        // setSpinner(false);
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







  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "93%",
        overflow: "hidden",
        ml: 7,
        boxShadow: 10
      }}
    >
      {spinner ? (
        <div>
          <img alt="warehouse" src={warehouse} width="900" />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "75vh",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                // checkboxSelection
                disableSelectionOnClick
                initialState={{
                  sorting: {
                    sortModel: [{ field: "Name", sort: "asc" }],
                  },
                  pagination: {
                    pageSize: 50,
                  },
                }}
                components={{ Toolbar: GridToolbar }}
                stopColumnsSorts={[{ field: "Delete", sortable: false }]}
                columns={[
                  { field: "Name", minWidth: 150 },
                  { field: "Brand", minWidth: 130 },
                  { field: "NSN", minWidth: 100 },
                  { field: "Size", minWidth: 100 },
                  { field: "Gender", minWidth: 100 },
                  // { field: "Bldg", minWidth: 100 },
                  { field: "Aisle", minWidth: 100 },
                  { field: "Count", minWidth: 100 },
                  {
                    field: "Count Status",
                    renderCell: (params) => (
                      <div>
                        {params.row.Count >
                        params.row.MinCount + params.row.MinCount * 0.25 ? (
                          <FiberManualRecordIcon sx={{ color: "#4CAF50" }} />
                        ) : params.row.Count <=
                            params.row.MinCount + params.row.MinCount * 0.25 &&
                          params.row.Count >= params.row.MinCount ? (
                          <FiberManualRecordIcon sx={{ color: "#fb8c00" }} />
                        ) : params.row.Count < params.row.MinCount ? (
                          <FiberManualRecordIcon sx={{ color: "#ff0000" }} />
                        ) : null}
                      </div>
                    ),
                  },
                  { field: "Initial", minWidth: 100 },
                  { field: "Returnable", minWidth: 100 },
                  { field: "Ordered", minWidth: 100 },
                  { field: "Courier", minWidth: 100 },
                  { field: "Tracking", minWidth: 100 },
                  {
                    field: "Issue",
                    renderCell: (params) => (
                      <div>
                      {currentShoppingCart?.map((cart) => cart.shopping_cart?.some((item) => item.UUID === params.row.UUID ) ? (
                          <AddCircleIcon
                          sx={{ cursor: "pointer", color: "#4CAF50" }}
                          onClick={handleClick(TransitionLeft)}
                          />  
                      ) : (
                          <AddCircleIcon 
                          sx={{ cursor: "pointer", color: "#4CAF50" }}
                            onClick={() => {
                              addToCart(params)
                              window.location.reload()
                            }}
                          />
                      ),)}
                      </div>
                    ),
                },
                  {
                    field: "Edit",
                    minWidth: 10,
                    editable: true,
                    renderCell: (params) => (
                      <Tooltip title="Edit Item">
                        <EditIcon
                          sx={{ cursor: "pointer", color: "#fb8c00" }}
                          onClick={() => onEditOpen(params)}
                        />
                      </Tooltip>
                    ),
                  },
                  {
                    field: "Delete",
                    minWidth: 10,
                    renderCell: (params) => (
                      <Tooltip title="Delete Item">
                        <DeleteIcon
                          sx={{ cursor: "pointer", color: "#ef5350" }}
                          onClick={() => onDelete(params)}
                        />
                      </Tooltip>
                    ),
                  },
                ]}
                rows={inventory?.map((row, index) => {
                  return {
                    id: index,
                    Delete: row.item_id,
                    Edit: row.item_id,
                    Name: row.item_name,
                    Brand: row.brand,
                    NSN: row.nsn,
                    Bldg: row.building,
                    Size: row.item_size,
                    Count: row.item_count,
                    Gender: row.gender,
                    Aisle: row.aisle,
                    Initial: row.intial_gear,
                    MinCount: row.minimum_count,
                    Ordered: row.ordered,
                    Courier: row.courier,
                    Tracking: row.tracking,
                    Returnable: row.returnable_item,
                    UUID: row.item_id,
                    Original: row.original_warehouse,
                  };
                })}
              />

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 425,
                    bgcolor: "background.paper",
                    borderRadius: "16px",
                    boxShadow: "0px 2px 0px 0px #FF9A01,0px 2px 25px 5px #FF9A01",
                    p: 4,
                    borderColor: "#FF9A01",
                  }}
                >
                  <CardContent>
                    <Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          sx={{ fontSize: 22 }}
                          color="text.primary"
                          gutterBottom
                        >
                          Edit Item: {editedItem?.Name} {editedItem.Brand}{" "}
                          {editedItem?.Size}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      id="modal-modal-description"
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "15ch" },
                        mt: 2,
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          disabled={false}
                          id="outlined-error"  
                          label="Name"
                          defaultValue={editedItem?.Name}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({ ...newValue, Name: e.target.value })
                          }
                        />
                        <TextField
                          id="filled"
                          label="NSN"
                          defaultValue={editedItem?.NSN}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({ ...newValue, NSN: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <TextField
                          disabled={false}
                          id="outlined-error"  
                          label="Gender"
                          defaultValue={editedItem?.Gender}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({ ...newValue, Gender: e.target.value })
                          }
                        />
                        <TextField
                          id="filled"
                          label="Brand"
                          defaultValue={editedItem?.Brand}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({ ...newValue, Brand: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <TextField
                          id="filled"
                          label="Building"
                          defaultValue={editedItem?.Bldg}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({ ...newValue, Bldg: e.target.value })
                          }
                        />
                        <TextField
                          id="filled"
                          label="Aisle"
                          defaultValue={editedItem?.Aisle}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({ ...newValue, Aisle: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <TextField
                          id="filled"
                          label="Size"
                          defaultValue={editedItem?.Size}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({ ...newValue, Size: e.target.value })
                          }
                        />
                        <TextField
                          id="filled"
                          label="In Stock"
                          type="number"
                          defaultValue={editedItem?.Count}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({ ...newValue, Count: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <TextField
                          id="filled"
                          label="Minimum Count"
                          type="number"
                          defaultValue={editedItem?.MinCount}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({
                              ...newValue,
                              MinCount: e.target.value,
                            })
                          }
                        />
                        <TextField
                          id="filled"
                          label="Ordered"
                          type="number"
                          defaultValue={editedItem?.Ordered}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({
                              ...newValue,
                              Ordered: e.target.value,
                            })
                          }
                        />
                        <TextField
                          id="filled"
                          label="Courier"
                          defaultValue={editedItem?.Courier}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) => setNewValue({ ...newValue, Courier: e.target.value })}
                        />
                        <TextField
                          id="filled"
                          label="Tracking"
                          defaultValue={editedItem?.Tracking}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) => setNewValue({ ...newValue, Tracking: e.target.value})}
                        /> 
                        <TextField
                          id="filled"
                          label="Initial Gear"
                          defaultValue={editedItem?.Initial}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({
                              ...newValue,
                              Initial: e.target.value,
                            })
                          }
                        />
                        <TextField
                          id="filled"
                          label="Returnable Item"
                          defaultValue={editedItem?.Returnable}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({
                              ...newValue,
                              Returnable: e.target.value,
                            })
                          }
                        />
                      </div>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Box sx={{ ml: 4.7, mt: 1 }}>
                      <Stack direction="row" spacing={2}>
                        <Button
                          color="secondary"
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          type="submit"
                          sx={{minWidth:"125px"}}
                          
                          startIcon={<SaveIcon />}
                          onClick={(e) => handleSubmit(e)}
                        >
                          Save
                        </Button>
                      </Stack>
                    </Box>
                  </CardActions>
                </Box>
              </Modal>

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
      )}
    </Box>
  );
}