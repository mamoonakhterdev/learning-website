import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, useTheme, useMediaQuery } from '@mui/material';
import science1 from "../../../assets/images/Science1.jpg";
import english1 from "../../../assets/images/English1.jpg";
import FilteredData from './filteredData';

const SearchFilter = ({ query }) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    console.log("Search query:", searchQuery);
  }, [searchQuery]);

  // Dummy routes for demonstration
  const scienceGrades = [
    "Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4",
    "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"
  ];

  const englishGrades = [
    "Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4",
    "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        padding: 2,
        width: '100%',
        boxSizing: 'border-box',
        gap: 2
      }}
    >
      {/* Boxes Container */}
      <Box
        sx={{
          width: isMobile ? '100%' : '25%',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Science Worksheets Box */}
        <Box
          sx={{
            backgroundColor: '#f0f0f0',
            borderRadius: 2,
            boxShadow: 1,
            padding: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', lineHeight: 1.2 }}>Science Worksheets</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <List sx={{ width: isMobile ? '100%' : '50%', fontSize: '0.875rem', lineHeight: 1 }}>
              {scienceGrades.map((grade) => (
                <ListItem key={grade} sx={{ padding: '0.25rem 0' }}>
                  <a href={`/science/${grade.replace(' ', '-').toLowerCase()}`}>{`${grade}`}</a>
                </ListItem>
              ))}
            </List>
            <Box
              component="img"
              src={science1}
              alt="Science Worksheets"
              sx={{
                width: isMobile ? '50%' : '30%',
                height: 'auto',
                maxWidth: isMobile ? '100%' : '300px', // Ensure image does not exceed container width
                borderRadius: 2,
                marginBottom: 2,
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>

        {/* English Worksheets Box */}
        <Box
          sx={{
            backgroundColor: '#f0f0f0',
            borderRadius: 2,
            boxShadow: 1,
            padding: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', lineHeight: 1.2 }}>English Worksheets</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <List sx={{ width: isMobile ? '100%' : '50%', fontSize: '0.875rem', lineHeight: 1 }}>
              {englishGrades.map((grade) => (
                <ListItem key={grade} sx={{ padding: '0.25rem 0' }}>
                  <a href={`/english/${grade.replace(' ', '-').toLowerCase()}`}>{`${grade}`}</a>
                </ListItem>
              ))}
            </List>
            <Box
              component="img"
              src={english1}
              alt="English Worksheets"
              sx={{
                width: isMobile ? '50%' : '30%',
                height: 'auto',
                maxWidth: isMobile ? '100%' : '300px', // Ensure image does not exceed container width
                borderRadius: 2,
                marginBottom: 2,
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Filter Container */}
      <Box
        sx={{
          width: isMobile ? '100%' : '70%',
          padding: 2,
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h5" gutterBottom>Search Filters</Typography>
        <Typography variant="h6">Current search query: {searchQuery}</Typography>
        <FilteredData query={query} />
      </Box>
    </Box>
  );
};

export default SearchFilter;
