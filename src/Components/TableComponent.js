import React from 'react';
import { Container, Typography } from '@mui/material';

const TableComponent = ({ subject, grade }) => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        The table shows data of {grade} of {subject}
      </Typography>
      {/* Placeholder for the table */}
      <Typography variant="body1">
        (Table will be here)
      </Typography>
    </Container>
  );
};

export default TableComponent;
