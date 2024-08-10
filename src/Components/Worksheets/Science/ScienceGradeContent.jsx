import React, { useState, useEffect } from 'react';
import { get, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { Link } from 'react-router-dom';
import ScienceSubcategory from './ScienceSubcategory';
import { Box, CircularProgress, Grid } from '@mui/material';
import ScienceItemDetails from './ScienceItemDetails';

const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, '');

const getGradeContent = (grade, subject, data, onCategoryClick) => {
  if (!data) {
    return <p>Loading content...</p>;
  }

  const normGrade = normalize(grade);
  const normSubject = normalize(subject);

  const filteredData = data.filter(item => {
    const itemGrade = normalize(item.grade);
    const itemSubject = normalize(item.subject);
    return itemGrade === normGrade && itemSubject === normSubject;
  });

  const uniqueCategories = Array.from(new Set(filteredData.map(item => item.category)));

  if (uniqueCategories.length === 0) {
    return <p>No content available for {grade} in {subject}.</p>;
  }

  return (
    <Grid container spacing={1}>
      {uniqueCategories.map((category, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Box 
            sx={{
              borderRadius: 1,
              padding: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: 'none',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <Link 
              to="#" 
              onClick={(e) => {
                e.preventDefault();
                onCategoryClick(category, filteredData);
              }} 
              className="text-decoration-underline text-primary"
            >
              {category}
            </Link>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

// Grade-specific components
const Grade1ScienceContent = ({ data, onCategoryClick }) => (
  <div className='text-start'>
    <h5>Additional Content for Grade 1</h5>
    {getGradeContent('Grade 1', 'Science', data, onCategoryClick)}
  </div>
);

const Grade2ScienceContent = ({ data, onCategoryClick }) => (
  <div className='text-start'>
    <h5>Additional Content for Grade 2</h5>
    {getGradeContent('Grade 2', 'Science', data, onCategoryClick)}
  </div>
);

const Grade3ScienceContent = ({ data, onCategoryClick }) => (
  <div className='text-start'>
    <h5>Additional Content for Grade 3</h5>
    {getGradeContent('Grade 3', 'Science', data, onCategoryClick)}
  </div>
);

const Grade4ScienceContent = ({ data, onCategoryClick }) => (
  <div className='text-start'>
    <h5>Additional Content for Grade 4</h5>
    {getGradeContent('Grade 4', 'Science', data, onCategoryClick)}
  </div>
);

const Grade5ScienceContent = ({ data, onCategoryClick }) => (
  <div className='text-start'>
    <h5>Additional Content for Grade 5</h5>
    {getGradeContent('Grade 5', 'Science', data, onCategoryClick)}
  </div>
);

const Grade6ScienceContent = ({ data, onCategoryClick }) => (
  <div className='text-start'>
    <h5>Additional Content for Grade 6</h5>
    {getGradeContent('Grade 6', 'Science', data, onCategoryClick)}
  </div>
);

const Grade7ScienceContent = ({ data, onCategoryClick }) => (
  <div className='text-start'>
    <h5>Additional Content for Grade 7</h5>
    {getGradeContent('Grade 7', 'Science', data, onCategoryClick)}
  </div>
);

const Grade8ScienceContent = ({ data, onCategoryClick }) => (
  <div className='text-start'>
    <h5>Additional Content for Grade 8</h5>
    {getGradeContent('Grade 8', 'Science', data, onCategoryClick)}
  </div>
);

const KindergartenScienceContent = ({ data, onCategoryClick }) => (
  <div className='text-start'>
    <h5>Additional Content for Kindergarten</h5>
    {getGradeContent('Kindergarten', 'Science', data, onCategoryClick, true)}
  </div>
);

// Main component to handle different grades
const ScienceGradeContent = ({ grade }) => {
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [showGradeContent, setShowGradeContent] = useState(true);
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [showItemDetails, setShowItemDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = ref(database, 'worksheets');
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          setData(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category, filteredData) => {
    setLoading(true);
    setSelectedCategory(category);

    const filteredItems = filteredData.filter(item => item.category === category);
    const uniqueSubcategories = Array.from(new Set(filteredItems.map(item => item.subCategory)));
    setSubcategories(uniqueSubcategories);
    setOriginalItems(filteredItems); // Store the original filtered items
    setItems(filteredItems); // Initially set the same as filtered items
    setShowGradeContent(false);
    setShowSubcategory(true);
    setLoading(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    setLoading(true);
    const filteredItems = originalItems.filter(item => item.subCategory === subcategory);
    setItems(filteredItems);
    setShowSubcategory(false);
    setShowItemDetails(true);
    setLoading(false);
  };

  const gradeContentMapping = {
    'Grade 1': <Grade1ScienceContent data={data} onCategoryClick={handleCategoryClick} />,
    'Grade 2': <Grade2ScienceContent data={data} onCategoryClick={handleCategoryClick} />,
    'Grade 3': <Grade3ScienceContent data={data} onCategoryClick={handleCategoryClick} />,
    'Grade 4': <Grade4ScienceContent data={data} onCategoryClick={handleCategoryClick} />,
    'Grade 5': <Grade5ScienceContent data={data} onCategoryClick={handleCategoryClick} />,
    'Grade 6': <Grade6ScienceContent data={data} onCategoryClick={handleCategoryClick} />,
    'Grade 7': <Grade7ScienceContent data={data} onCategoryClick={handleCategoryClick} />,
    'Grade 8': <Grade8ScienceContent data={data} onCategoryClick={handleCategoryClick} />,
    'Kindergarten': <KindergartenScienceContent data={data} onCategoryClick={handleCategoryClick} />,
  };

  
  return (
    <div className="mt-4">
      <h6>{grade} Science Content</h6>
      <div className="mt-2">
        {showGradeContent && gradeContentMapping[grade]}
      </div>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {/* Render subcategories if a category is selected */}
      {!loading && showSubcategory && (
        <div className="mt-4">
          <ScienceSubcategory subcategories={subcategories} onSubcategoryClick={handleSubcategoryClick} items={originalItems} />
        </div>
      )}
      {/* Render item details if a subcategory is selected */}
      {!loading && showItemDetails && (
        <div className="mt-4">
          <ScienceItemDetails items={items} />
        </div>
      )}
    </div>
  );
};

export default ScienceGradeContent;
