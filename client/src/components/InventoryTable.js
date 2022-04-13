import React, {useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbar, GridCellEditStopReasons  } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DotDropDown from "./DotDropDown.js";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckoutDrawer from "./CheckoutDrawer.js";



export default function RowsGrid(props) {
  const [status, setStatus] = React.useState('connected')

        //fetch for inventory items
        useEffect(() => {
          fetchResults();
      }, []);
  
      const [results, setResults] = useState ([]);
  
      const fetchResults = async () => {
          const data = await fetch(
              'https://postgres-apr.herokuapp.com/inventory'
          );
  
          const results = await data.json();
          setResults(results);
        };
        
        
        console.log(results);
  return (
    <Box sx={{ display: 'flex', justifyContent: "center", width: '90%', overflow: 'hidden', ml: 7 }}>
      <div style={{height: 530, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}> 
      
      <DataGrid
      components={{ Toolbar: GridToolbar }}
        // experimentalFeatures={{ newEditingApi: true }} 
        //   onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
        //     if (params.reason === GridCellEditStopReasons.cellFocusOut) {
        //       event.defaultMuiPrevented = true;
        //     }}}
            onCellClick={(params: GridCellParams, event: MuiEvent<React.MouseEvent>) => {
              event.defaultMuiPrevented = true;
            }}
            stopColumnsSorts={[{ field: 'ratin', sortable: false }]}
      
    
        columns = {[
          {field: 'Details', minWidth: 10, renderCell: () =>         
            <DotDropDown/>, 
          },
          { field: 'Name', minWidth: 130,  },
          { field: 'Brand', minWidth: 150,  },
          { field: 'NSN', minWidth: 100 },
          { field: 'Size', minWidth: 100 },
          { field: 'Gender', minWidth: 100 },
          { field: 'Bldg', minWidth: 100 },
          { field: 'Aisle', minWidth: 100 },
          { field: 'Count',
            minWidth: 100, 
            editable: true,
          },
          {field: 'Count Status', renderCell: () =>         
          <FiberManualRecordIcon
          fontSize="small"
          sx={{
            mr: 2,
            color: props.status === 'connected' ? '#4caf50' : '#d9182e',
          }}
        />
          },
          { field: 'Initial', minWidth: 100 },
          {field: 'Issue', renderCell: () =>         
            <AddIcon/>
          },
        ]}

        rows={[
          { id: 1, Name: 'Radio Pouches', NSN: 1324171354, Bldg: '994', Size: 'N/A', Count: 37, Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 2, Name: 'Handcuff Pouches', NSN: 8175635967, Bldg: '994', Size: 'N/A', Count: 45, Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 3, Name: 'M9 Pouches', NSN: 172356492, Bldg: '994', Size: 'N/A', Count: 87, Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 4, Name: 'M4 Pouches', NSN: 84652629, Bldg: '994', Size: 'N/A', Count: 62, Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 5, Name: 'Baton Pouch', NSN: 390465738, Bldg: '994', Size: 'N/A', Count: 93, Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 6, Name: 'Handcuffs', NSN: 9403672834, Bldg: '994', Size: 'N/A', Count: 27, Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 7, Name: 'Beret', NSN: 489537436, Bldg: '994', Size: '7', Count: 19, Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 8, Name: 'Beret', NSN: 489574635, Bldg: '994', Size: '7 1/4', Count: 12, Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 9, Name: 'Beret',NSN: 58974635, Bldg: '994', Size: '7 1/2', Count: 9, Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 10, Name: 'Beret', NSN: 49586938, Bldg: '994', Size: '7 3/4', Count: 12, Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 11, Name: 'Handcuffs', NSN: 4958593829, Bldg: '994', Size: 'N/A', Count: 26, Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 12, Name: 'Hand Cuff Key', NSN: 495985793, Bldg: '994', Size: 'N/A', Count: 37, Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 13, Name: 'SF Badges', NSN: 738462734, Bldg: '994', Size: 'N/A', Count: 22, Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 15, Name: 'SF Patch', NSN: 849573627, Bldg: '994', Size: 'N/A', Count: 37, Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 16, Name: 'CMSgt Patch', NSN: 4859472648, Bldg: '994', Size: 'N/A', Count: '5', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 17, Name: 'SMsgt Patch', NSN: 49584736, Bldg: '994', Size: 'N/A', Count: '2', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 18, Name: 'MSgt Patch', NSN: 49587364, Bldg: '994', Size: 'N/A', Count: '0', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 19, Name: 'TSgt Patch', NSN: 495038264, Bldg: '994', Size: 'N/A', Count: '27', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 20, Name: 'SSgt Patch', NSN: 49582647, Bldg: '994', Size: 'N/A', Count: '46', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 21, Name: 'SrA Patch', NSN: 950675825, Bldg: '994', Size: 'N/A', Count: '12', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 22, Name: 'A1C Patch', NSN: 485954725, Bldg: '994', Size: 'N/A', Count: '27', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 23, Name: 'Amn Patch',NSN: 40598263784, Bldg: '994', Size: 'N/A', Count: '88', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 24, Name: '1 Lt Patch', NSN: 485029487, Bldg: '994', Size: 'N/A', Count: '0', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 25, Name: '2 Lt Patch', NSN: 485950284, Bldg: '994', Size: 'N/A', Count: '0', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 26, Name: 'Major Patch', NSN: 485957384, Bldg: '994', Size: 'N/A', Count: '0', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 27, Name: 'Capt Patch', NSN: 485957284, Bldg: '994', Size: 'N/A', Count: '3', Gender: "N/A", Aisle: "4", Initial: "No" },
          { id: 28, Name: 'Space Force Patch', NSN: 485957263, Bldg: '994', Size: 'N/A', Count: '0', Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 29, Name: 'Squadron Patch', NSN: 485957361, Bldg: '994', Size: 'N/A', Count: '16', Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 30, Name: 'Fleece', NSN: 485957461, Bldg: '994', Size: 'Large', Count: '1', Gender: "N/A", Aisle: "4", Initial: "Yes" },
          { id: 31, Name: 'Apecs Top', NSN: 485957564, Bldg: '994', Size: 'Large', Count: '2', Gender: "N/A", Aisle: "4", Initial: "Yes" },
        ]}
      />


          </div>
        </div>
      </div>
    </Box>
  );
}