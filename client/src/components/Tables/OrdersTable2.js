import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(orderNumber, date, company, website, details, courier, tracking) {
  return {
    orderNumber,
    date,
    company,
    website,
    details,
    courier,
    tracking,
    orderItems: [
      {
        name: 'Nike',
        nsn: '11091700',
        size: 9,
        gender: 'Male',
        ordered: '5'
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderNumber}
        </TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.company}</TableCell>
        <TableCell>{row.website}</TableCell>
        <TableCell>{row.details}</TableCell>
        <TableCell>{row.courier}</TableCell>
        <TableCell>{row.tracking}</TableCell>
      </TableRow>
      <TableRow>

        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>NSN</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Ordered</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orderItems.map((orderItemsRow) => (
                    <TableRow key={orderItemsRow.date}>
                      <TableCell> {orderItemsRow.name}</TableCell>
                      <TableCell>{orderItemsRow.nsn}</TableCell>
                      <TableCell>{orderItemsRow.size}</TableCell>
                      <TableCell>{orderItemsRow.gender}</TableCell>
                      <TableCell>{orderItemsRow.ordered}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>

          
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    order: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('928374857', "15 June 22", "Tacti-Cool", "www.tacti-cool.com", "John Doe /john.doe@gmail.com/321-111-2222", "USPS", "263748957"),
  createData('374857364', "15 May 22", "Tacti-Cool" , "www.tacti-cool.com", "John Doe /john.doe@gmail.com/321-111-2222", "UPS", "263748957"),
  createData('948573847', " 3 Apr 22", "Tacti-Cool", "www.tacti-cool.com", "John Doe /john.doe@gmail.com/321-111-2222", "DWS", "263748957"),
  createData('94857468', "18 Feb 22", "Tacti-Cool", "www.tacti-cool.com", "John Doe /john.doe@gmail.com/321-111-2222", "USPS", "263748957"),
  createData('485972839', "1 Jan 22", "Tacti-Cool", "www.tacti-cool.com", "John Doe /john.doe@gmail.com/321-111-2222", "DWS", "263748957"),
];

export default function CollapsibleTable() {
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      width: "90%",
      overflow: "hidden",
      ml: 7,
    }}
  >
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>OrderNumber</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Courier</TableCell>
            <TableCell>Tracking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
