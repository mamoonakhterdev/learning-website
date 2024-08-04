import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Define separate functions for each grade's content
const getGrade1Content = () => {
    return (
        <>
            Detailed content and resources for Grade 1 students.
        </>
    )
};

const getGrade2Content = () => 'Detailed content and resources for Grade 2 students.';

const getGrade3Content = () => 'Detailed content and resources for Grade 3 students.';

const getGrade4Content = () => 'Detailed content and resources for Grade 4 students.';

const getGrade5Content = () => 'Detailed content and resources for Grade 5 students.';

const getGrade6Content = () => 'Detailed content and resources for Grade 6 students.';

const getGrade7Content = () => 'Detailed content and resources for Grade 7 students.';

const getGrade8Content = () => 'Detailed content and resources for Grade 8 students.';

const getKindergartenContent = () => 'Detailed content and resources for Kindergarten students.';

// Function to get content based on grade
const getGradeContent = (grade) => {
  switch (grade) {
    case 'Grade 1':
      return getGrade1Content();
    case 'Grade 2':
      return getGrade2Content();
    case 'Grade 3':
      return getGrade3Content();
    case 'Grade 4':
      return getGrade4Content();
    case 'Grade 5':
      return getGrade5Content();
    case 'Grade 6':
      return getGrade6Content();
    case 'Grade 7':
      return getGrade7Content();
    case 'Grade 8':
      return getGrade8Content();
    case 'Kindergarten':
      return getKindergartenContent();
    default:
      return 'Please select a grade to view the content.';
  }
};

const ScienceGradeContent = ({ grade }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        {grade} Content
      </Typography>
      <Typography variant="body1">
        {getGradeContent(grade)}
      </Typography>
    </Box>
  );
};

export default ScienceGradeContent;
