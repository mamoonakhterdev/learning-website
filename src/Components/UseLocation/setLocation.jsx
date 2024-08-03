import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const UseLocation = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} style={{marginLeft: "4vw", marginTop: "1vw",}} aria-label="breadcrumb">
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <HomeIcon style={{ marginRight: '8px' }} />
      </Link>
      {pathnames.length > 0 && (
        pathnames.map((pathname, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography color="textPrimary" key={to}>
              {pathname.charAt(0).toUpperCase() + pathname.slice(1).replace('-', ' ')}
            </Typography>
          ) : (
            <Link to={to} key={to} style={{ textDecoration: 'none' }}>
              {pathname.charAt(0).toUpperCase() + pathname.slice(1).replace('-', ' ')}
            </Link>
          );
        })
      )}
    </Breadcrumbs>
  );
};

export default UseLocation;
