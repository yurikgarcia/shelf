import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DotDropDown from "./DotDropDown.js";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function RowsGrid(props) {
  // const [status, setStatus] = useState('connected') //TODO: selecting status  dev:GARCIA
  
  return (
    <Box sx={{ display: 'flex', justifyContent: "center", width: '90%', overflow: 'hidden', ml: 7 }}>
      <div style={{ height: 530, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              components={{ Toolbar: GridToolbar }}
              stopColumnsSorts={[{ field: 'ratin', sortable: false }]}
              columns={[
                {
                  field: 'Details', minWidth: 10, renderCell: () =>
                    <DotDropDown inventory={props.inventory} />,
                },
                { field: 'Name', minWidth: 130, },
                { field: 'Brand', minWidth: 150, },
                { field: 'NSN', minWidth: 100 },
                { field: 'Size', minWidth: 100 },
                { field: 'Gender', minWidth: 100 },
                { field: 'Bldg', minWidth: 100 },
                { field: 'Aisle', minWidth: 100 },
                {
                  field: 'Count',
                  minWidth: 100,
                  editable: true,
                },
                {
                  field: 'Count Status', renderCell: () =>
                    <FiberManualRecordIcon
                      fontSize="small"
                      sx={{
                        mr: 2,
                        color: props.status === 'connected' ? '#4caf50' : '#d9182e',
                      }}
                    />
                },
                { field: 'Initial', minWidth: 100 },
                {
                  field: 'Issue', renderCell: () =>
                    <AddIcon />
                },
              ]}
              rows={props.inventory?.map((row, index) => {
                return {
                  id: index,
                  Name: row.item_name,
                  Brand: row.brand,
                  NSN: row.nsn,
                  Bldg: row.building,
                  Size: row.item_size,
                  Count: row.item_count,
                  Gender: row.gender,
                  Aisle: row.aisle,
                  Initial: row.intial_gear
                };
              })}
            />
          </div>
        </div>
      </div>
    </Box>
  );
}