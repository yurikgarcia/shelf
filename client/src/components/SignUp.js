import * as React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { flexbox } from "@mui/system";

const card = (
  <React.Fragment>
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AccountCircleIcon sx={{ width: "150px", height: "150px", color: "white" }} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", ml:3, mt:10 }}>
        <div>
          <TextField
            disabled={false}
            id="filled"
            variant="filled"
            label="First Name"
            // defaultValue={editedItem?.Name}
            sx={{ backgroundColor: "white", borerRadius: "5" }}
            // onChange={(e) =>
            //   setNewValue({ ...newValue, Name: e.target.value })
            // }
          />
          <TextField
            id="filled"
            variant="filled"
            label="Last Name"
            // defaultValue={editedItem?.NSN}
            sx={{ backgroundColor: "white", borerRadius: "5" }}
            // onChange={(e) =>
            //   setNewValue({ ...newValue, NSN: e.target.value })
            // }
          />
        </div>
        <div>
          <TextField
            disabled={false}
            id="filled"
            variant="filled"
            label="DOD ID"
            // defaultValue={editedItem?.Name}
            sx={{ backgroundColor: "white", borerRadius: "5" }}
            // onChange={(e) =>
            //   setNewValue({ ...newValue, Name: e.target.value })
            // }
          />
          <TextField
            id="filled"
            variant="filled"
            label="Email Address"
            // defaultValue={editedItem?.NSN}
            sx={{ backgroundColor: "white", borerRadius: "5" }}
            // onChange={(e) =>
            //   setNewValue({ ...newValue, NSN: e.target.value })
            // }
          />
        </div>
      </Box>
    </CardContent>
    <CardActions>
      <Box sx={{display: 'flex', justifyContent: 'center', ml:24}}>
        <Button
          color="secondary"
          variant="contained"
          type="submit" 
        >
          SUBMIT!
        </Button>
      </Box>
    </CardActions>
  </React.Fragment>
);

export default function SignUp() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignContent: "center", mt:10 }}
    >
      <Card sx={{ width: "500px", bgcolor: "#1A73E8" }} variant="outlined">
        {card}
      </Card>
    </Box>
  );
}
