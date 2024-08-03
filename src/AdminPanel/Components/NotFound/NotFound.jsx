// src/components/NotFound/NotFound.jsx
import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)`
  text-align: center;
  margin-top: 50px;
`;

const NotFound = () => {
  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </StyledBox>
  );
};

export default NotFound;
