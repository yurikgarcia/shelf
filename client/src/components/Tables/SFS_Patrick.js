import React, { useState, useEffect, useContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import AppContext from "../AppContext.js";
import AppContext2 from "../AppContext2.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from '@mui/material/Checkbox';
import { DataGrid, GridToolbar, GridToolbarDensitySelector, } from "@mui/x-data-grid";
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Modal from "@mui/material/Modal";
import MuiAlert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import PropTypes from 'prop-types';
import SaveIcon from "@mui/icons-material/Save";
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Stack from "@mui/material/Stack";
import Swal from 'sweetalert2'
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
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
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (params) => {
  setEditedItem(params.row)
  setOpenDeleteModal(true);
  };
  const { API } = useContext(AppContext);
  
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const [editedItem, setEditedItem] = useState({
    Name: "",
    Brand: "",
    NSN: "",
    Bldg: "",
    Size: "-",
    Count: 0,
    Gender: "-",
    Aisle: "-",
    Initial: "",
    MinCount: 0,
    Ordered: 0,
    Returnable: false,
    Courier: "-",
    Tracking: "-",
    Notes: "",
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
    Aisle: "-",
    Initial: '',
    MinCount: 0,
    Ordered: "",
    Returnable: "",
    Courier: "-",
    Tracking: "-",
    Original: "",
    Notes: "",
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const onDelete = async (params) => {
    let id = editedItem.Delete;
    console.log("DELETE HIT",id);
    axios({
      method: "delete",
      url:
        `${API.website}/45sfspatrickinventory`,
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

  // console.log('patrick Inv', inventory)

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
        `${API.website}/45sfspatrickinventory`,
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
        Notes: newValue.Notes,
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
      .patch(`${API.website}/shopping-cart/${user_dod}/${currentDate}`, userShoppingCart)
        .then((res) => {
          if (res.status === 200) {
            setNewShoppingCart([...newShoppingCart, userShoppingCart]);
            // fetchInventory();
            fetchNewShoppingCart();
            window.location.reload()
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
      .get(`${API.website}/users`, {
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
      .get(`${API.website}/shopping-cart/${user_dod}`, {
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

  const handleInitialValue = (e) => {
    setNewValue({ ...newValue, Initial: e.target.value })
  };

  const handleReturnableValue = (e) => {
    setNewValue({ ...newValue, Returnable: e.target.value })
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

    const handleSelectionModelChange = (newSelection) => {
      setSelectedRows(newSelection.selectionModel);
    };

    const [selectedRows, setSelectedRows] = useState([]);
  
    // const handleAddSelectedRows = () => {
    //   // add selected rows to the array
    //   console.log("INSIDE", selectedRows);
    // };

   
    // const handleAddSelectedRows = (params) => {
    //   setSelectedRows((prevSelectedRows) => [...prevSelectedRows, params]);
    //   console.log("INSIDE", selectedRows);
    //   console.log("INSIDE PARAMS", params)
    // };

    // const handleAddSelectedRows = (params) => {
    //   setSelectedRows((prevSelectedRows) => [...prevSelectedRows, params]);
    //   console.log("params:", params);
    //   console.log("selectedRows:", selectedRows);
    // };

    // const handleAddSelectedRows = (selectionModel) => {
    //   setSelectedRows(selectionModel.map((id) => {
    //     const row = inventory.find((row) => row.item_id === id);
    //     return { ...row };
    //   }));
    // };

    const [selectionModel, setSelectionModel] = React.useState([]);

    console.log(" OUTSIDE selectedRows", selectedRows)



  return (
    <AppContext2.Provider value={selectedRows}>
    <Box sx={{ width: "100%", boxShadow: 10 }} >
      {spinner ? (
        <div>
          <img alt="warehouse" src={warehouse} width="900" />
        </div>
      ) : (
        <div style={{ height: "77vh", width: "100%"}}>
          <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <div style={{ flexGrow: 1 }}>

              <DataGrid
                // checkboxSelection={true}
                disableSelectionOnClick
                initialState={{
                  sorting: {
                    sortModel: [{ field: "Name", sort: "asc" }],
                  },
                  pagination: {
                    pageSize: 100,
                  },
                  // density: { density: "compact"}
                }}
                // defaultDensity={GridDensity.COMPACT}
                density="compact"
                components={{ Toolbar: GridToolbar }}
                stopColumnsSorts={[{ field: "Delete", sortable: false }]}
                columns={[
                  // { width: 50, 
                  // renderCell: (params) => (    
                  //     <Checkbox
                  //       onChange={(event) => {
                  //         if (event.target.checked) {
                  //           setSelectedRows((prevSelectedRows) => [...prevSelectedRows, params.row]);
                  //         } else {
                  //           setSelectedRows((prevSelectedRows) =>
                  //             prevSelectedRows.filter((row) => row.UUID !== params.row.UUID)
                  //           );
                  //         }
                  //       }}
                  //     />
                  // ),
                  // },
                  { field: "Name", minWidth: 150, renderCell: renderCellExpand  },
                  { field: "Brand", minWidth: 130, renderCell: renderCellExpand  },
                  { field: "NSN", minWidth: 150, renderCell: renderCellExpand  },
                  { field: "Size", minWidth: 100, renderCell: renderCellExpand  },
                  { field: "Gender", minWidth: 100, renderCell: renderCellExpand  },
                  // { field: "Bldg", minWidth: 100 },
                  { field: "Aisle", minWidth: 100, renderCell: renderCellExpand  },
                  { field: "Count", minWidth: 100, renderCell: renderCellExpand  },
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
                  { field: "Ordered", minWidth: 100, renderCell: renderCellExpand  },
                  { field: "Courier", minWidth: 100, renderCell: renderCellExpand  },
                  { field: "Tracking", minWidth: 100, renderCell: renderCellExpand  },

                  {
                    field: "Issue",
                    renderCell: (params) => (
                      <div>
                      {currentShoppingCart?.map((cart) => cart.shopping_cart?.some((item) => item.UUID === params.row.UUID ) ? (
                          <AddCircleIcon
                          sx={{ cursor: "pointer", color: "#ff0000" }}
                          onClick={handleClick(TransitionLeft)}
                          />  
                      ) : (
                          <AddCircleIcon 
                          sx={{ cursor: "pointer", color: "#4CAF50" }}
                            onClick={() => {
                              addToCart(params)
                              // window.location.reload()
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
                          onClick={() => 
                            handleOpenDeleteModal(params)}
                        />
                      </Tooltip>
                    ),
                  },
                  { field: "Notes", minWidth: 200, renderCell: renderCellExpand  },
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
                    Notes: row.notes,
                    Ordered: row.ordered,
                    Courier: row.courier,
                    Tracking: row.tracking,
                    Returnable: row.returnable_item,
                    UUID: row.item_id,
                    Original: row.original_warehouse,
                    Original_UUID: row.original_uuid,
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
                        ml:2
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
                          id="filled"
                          label="Brand"
                          defaultValue={editedItem?.Brand}
                          sx={{ borerRadius: "5" }}
                          onChange={(e) =>
                            setNewValue({ ...newValue, Brand: e.target.value })
                          }
                        />
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
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ minWidth: 120, ml: 1, mt:1 }}>
                          <FormControl sx={{width: 135}}>
                            <InputLabel id="demo-simple-select-label">Initial Gear</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={newValue.Initial}
                              label="Initial"
                              onChange={handleInitialValue}
                            >
                              <MenuItem value={'Yes'}>Yes</MenuItem>
                              <MenuItem value={'No'}>No</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>

                        <Box sx={{ minWidth: 120, ml: 1, mt:1 }}>
                        <FormControl sx={{width: 135, mt: 1}}>
                            <InputLabel id="demo-simple-select-label">Returnable Gear</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={newValue.Returnable}
                              label="Returnable"
                              onChange={handleReturnableValue}
                            >
                              <MenuItem value={'Yes'}>Yes</MenuItem>
                              <MenuItem value={'No'}>No</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Stack>
                      </div>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent:"center",}}>
                        <TextField
                          id="filled"
                          label="Notes"
                          defaultValue={editedItem?.Notes}
                          sx={{ borerRadius: "5", width: "85%", mt: 2 }}
                          onChange={(e) => setNewValue({ ...newValue, Notes: e.target.value})}
                        /> 
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

              <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '6px solid #000',
                  borderRadius: '16px',
                  boxShadow: "0px 2px 0px 0px #c62828,0px 2px 25px 5px #c62828",
                  p: 4,
                  borderColor: "#c62828",
                }} >
                  <DangerousOutlinedIcon sx={{ display: 'flex', justifyContent: 'center', ml:15, fontSize: 80 }}/>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      Are You Sure You Want To Delete: 
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <h3>{editedItem?.Name} {editedItem.Brand} {editedItem.Size}</h3>
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                      Data from this item will be PERMENENTLY DELETED!
                    </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Stack direction="row" spacing={2}>
                      <Button
                        onClick={() => setOpenDeleteModal(false)}
                      color='secondary' variant="outlined" startIcon={<CancelIcon />}>
                        Cancel
                      </Button>
                      <Button color='secondary' variant="contained"                           
                          onClick={(params) => {
                            onDelete(params);
                            handleCloseDeleteModal();
                            }
                          } startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </Stack>
                  </Box>
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
    </AppContext2.Provider>
  );
}