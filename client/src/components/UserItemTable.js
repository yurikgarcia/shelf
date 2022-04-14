import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import ReturnModal from "./ReturnModal.js";



export default function RowsGrid(props) {
  // const [status, setStatus] = React.useState('connected')


  return (
    <Box sx={{ display: 'flex', justifyContent: "center", width: '90%', overflow: 'hidden', ml: 7 }}>
      <div style={{height: 490, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}> 
            <DataGrid
            components={{ Toolbar: GridToolbar }}
            
              columns = {[
                // {field: 'Details', renderCell: () =>         
                //   <DotDropDown/>
                // },
                { field: 'Name', minWidth: 200,  },
                { field: 'Brand', minWidth: 150,  },
                { field: 'Size', minWidth: 125 },
                { field: 'NSN', minWidth: 250 },
                { field: 'Amount', minWidth: 100 },
                { field: 'Returnable', minWidth: 150 },
                {field: 'Return', renderCell: () =>         
                  <ReturnModal/>
                },
              ]}

              rows={[
                { id: 1, Name: 'Radio Pouch', NSN: 1324171354,  Size: 'N/A', Amount: 1  },
                { id: 2, Name: 'Baton Pouch', NSN: 1324171354,  Size: 'N/A', Amount: 1  },
                { id: 3, Name: 'Handcuff Pouch', NSN: 1324171354,  Size: 'N/A', Amount: 1  },
                { id: 4, Name: 'M9 Pouch', NSN: 1324171354,  Size: 'N/A', Amount: 2  },
                { id: 5, Name: 'M4 Pouch', NSN: 1324171354,  Size: 'N/A', Amount: 3  },
                { id: 6, Name: 'Baret', NSN: 1324171354,  Size: ' 7 3/4', Amount: 1  },
                { id: 7, Name: 'TSgt Patch', NSN: 1324171354,  Size: 'N/A', Amount: 1  },
              ]}
            />
          </div>
        </div>
      </div>
    </Box>
  );
}