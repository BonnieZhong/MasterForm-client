import React from 'react';
import { Grid, TextField } from '@mui/material';
import "./index.css";

const BasicInfoComponent = ({ set, clientInfo }) => {
  return (
    <Grid 
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* First Name and Last Name */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item lg={6} md={6}>
          <p className="label-text">First Name</p>
          <TextField 
            id="firstName" 
            variant="outlined" 
            value={clientInfo.firstName} 
            onChange={set("firstName")}
            fullWidth
          />
        </Grid>
        <Grid item lg={6} md={6}>
          <p className="label-text">Last Name</p>
          <TextField 
            id="lastName" 
            variant="outlined"
            value={clientInfo.lastName} 
            onChange={set("lastName")} 
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Phone and Email */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item lg={6} md={6}>
          <p className="label-text">Contact Number</p>
          <TextField 
            id="phone" 
            variant="outlined" 
            value={clientInfo.phone}
            onChange={set("phone")}
            fullWidth/>
        </Grid>
        <Grid item lg={6} md={6}>
          <p className="label-text">Email</p>
          <TextField 
            id="email" 
            variant="outlined"
            value={clientInfo.email}
            onChange={set("email")} 
            fullWidth/>
        </Grid>
      </Grid>
      
    </Grid>
  );
};

export default BasicInfoComponent;