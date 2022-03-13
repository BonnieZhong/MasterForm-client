import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper
} from '@mui/material';

import ExperimentRow from '../../components/ExperimentRow';
import HeaderComponent from '../../components/HeaderComponent';
import './index.css';
import '../../components/App.css'

const AdminPage = ({ allExperiments }) => {
  const [experiments, setExperiments] = useState([]);

  // Dynamic render table cells
  const renderTableCells = () => {
    if(experiments.length > 0){
      return experiments.map(item => (
        <ExperimentRow key={item.id} experiment={item}/>
      ));
    }
  };

  // Render table view
  const renderTable = () => {
    return (
      <>
        <h1 className="admin-title">Manage your experiments</h1>
        <TableContainer component={Paper} className="table-margin">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" className="table-head-text">Name</TableCell>
                <TableCell align="left" className="table-head-text">Status</TableCell>
                <TableCell align="left" className="table-head-text">Enable</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableCells()}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  };

  useEffect(() => {
    if(allExperiments.length > 0) {
      setExperiments(allExperiments);
    }
  }, [allExperiments]);

  return (
    <>
      <HeaderComponent showBg={true}/>
      <div className="div-container">
        {experiments.length > 0 ? renderTable() : (
          <h1 className="loading-text">Loading you experiments...</h1>
        )}
      </div>
    </>
  )
};

export default AdminPage;