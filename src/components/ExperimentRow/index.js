import React, { useState } from 'react';
import { 
  TableCell, 
  TableRow, 
  Switch 
} from '@mui/material';

import forms from '../../api/forms';

const ExperimentRow = ({ experiment, setRefetchData }) => {
  const [checked, setChecked] = useState(!experiment.disabled);

  // Update the experiment status in DB and UI
  const onChange = (event) => {
    setChecked(event.target.checked);
    forms.patch(`/experiments/${experiment.id}`, {
      disabled : checked
    });
    setRefetchData(true);
  };

  return (
    <>
      <TableRow key={experiment.id}>
        <TableCell sx={{fontSize: "18px !important"}}>{experiment.title}</TableCell>
        <TableCell sx={{fontSize: "18px !important"}}>{checked ? 'Available' : 'Not Available'}</TableCell>
        <TableCell>
          <Switch 
            checked={checked} 
            onChange={onChange}
          />
        </TableCell>
      </TableRow>
    </>

  );
};

export default ExperimentRow;