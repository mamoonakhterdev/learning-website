import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Define separate functions for each grade's content
const getGrade1Content = () => (
  <>
    <Typography variant="body1">
      Explore activities that help with alphabet recognition, simple sentence construction, and basic vocabulary building.
    </Typography>
    <Typography variant="body1">
      <strong>Resources:</strong> Alphabet tracing worksheets, basic word lists, and simple sentence exercises.
    </Typography>
  </>
);

const getGrade2Content = () => (
  <>
    <Typography variant="body1">
      Activities focus on improving reading comprehension, grammar basics, and expanding vocabulary.
    </Typography>
    <Typography variant="body1">
      <strong>Resources:</strong> Reading passages, grammar exercises, and vocabulary-building activities.
    </Typography>
  </>
);

const getGrade3Content = () => (
  <>
    <Typography variant="body1">
      Emphasis on reading comprehension, writing short paragraphs, and understanding sentence structure.
    </Typography>
    <Typography variant="body1">
      <strong>Resources:</strong> Comprehension exercises, paragraph writing prompts, and sentence structure activities.
    </Typography>
  </>
);

const getGrade4Content = () => (
  <>
    <Typography variant="body1">
      Focus on reading comprehension, narrative writing, and grammar skills, including parts of speech.
    </Typography>
    <Typography variant="body1">
      <strong>Resources:</strong> Narrative prompts, grammar worksheets, and comprehension questions.
    </Typography>
  </>
);

const getGrade5Content = () => (
  <>
    <Typography variant="body1">
      Activities aimed at improving essay writing, advanced reading comprehension, and detailed grammar exercises.
    </Typography>
    <Typography variant="body1">
      <strong>Resources:</strong> Essay prompts, complex comprehension passages, and detailed grammar worksheets.
    </Typography>
  </>
);

const getGrade6Content = () => (
  <>
    <Typography variant="body1">
      Emphasis on critical reading skills, writing essays, and understanding advanced grammar concepts.
    </Typography>
    <Typography variant="body1">
      <strong>Resources:</strong> Critical reading exercises, essay topics, and advanced grammar drills.
    </Typography>
  </>
);

const getGrade7Content = () => (
  <>
    <Typography variant="body1">
      Focus on analytical reading, advanced writing techniques, and detailed grammar analysis.
    </Typography>
    <Typography variant="body1">
      <strong>Resources:</strong> Analytical reading passages, writing prompts, and comprehensive grammar exercises.
    </Typography>
  </>
);

const getGrade8Content = () => (
  <>
    <Typography variant="body1">
      Activities for refining writing skills, in-depth reading analysis, and mastering complex grammar rules.
    </Typography>
    <Typography variant="body1">
      <strong>Resources:</strong> Writing prompts, reading analysis exercises, and complex grammar worksheets.
    </Typography>
  </>
);

const getKindergartenContent = () => (
  <>
    <Typography variant="body1">
      Fun and engaging activities focusing on letter recognition, basic vocabulary, and simple sentence formation.
    </Typography>
    <Typography variant="body1">
      <strong>Resources:</strong> Letter matching games, simple word lists, and sentence-building activities.
    </Typography>
  </>
);

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
      return (
        <Typography variant="body1">
          Please select a grade to view the content.
        </Typography>
      );
  }
};

const EnglishGradeContent = ({ grade }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        {grade} Content
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        {getGradeContent(grade)}
      </Box>
    </Box>
  );
};

export default EnglishGradeContent;
