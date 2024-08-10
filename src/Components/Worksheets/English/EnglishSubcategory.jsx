import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import EnglishItemDetails from './EnglishItemDetails'; // Updated import to English-specific component

const EnglishSubcategory = ({ subcategories, onSubcategoryClick, items }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (selectedSubcategory) {
      const newFilteredItems = items.filter(item => item.subCategory === selectedSubcategory);
      setFilteredItems(newFilteredItems);
    }
  }, [selectedSubcategory, items]);

  const handleSubcategoryClick = (subcat) => {
    onSubcategoryClick(subcat); 
    setSelectedSubcategory(subcat);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Choose the following topic
      </Typography>
      {subcategories.length > 0 ? (
        <Grid container spacing={1}>
          {subcategories.map((subcat, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Box 
                sx={{
                  borderRadius: 1,
                  padding: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 'auto',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  boxShadow: 'none',
                }}
              >
                <Link 
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubcategoryClick(subcat); // Pass subcategory to parent
                  }} 
                  className="text-decoration-underline text-primary"
                >
                  {subcat}
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">
          No subcategories available.
        </Typography>
      )}

      {/* Render EnglishItemDetails with filtered items */}
      {filteredItems.length > 0 && <EnglishItemDetails items={filteredItems} />}
    </div>
  );
};

export default EnglishSubcategory;
