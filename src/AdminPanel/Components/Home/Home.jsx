import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { logEvent } from 'firebase/analytics';
import { analytics, database, ref, get } from '../../../firebaseConfig';

// Styled components
const InfoCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  boxShadow: theme.shadows[3],
  padding: '20px',
  textAlign: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
}));

const AdminHome = () => {
  const [data, setData] = useState({
    totalWorksheets: 0,
    totalPracticeQuestions: 0,
    categories: {},
    subjects: {},
    grades: {},
  });

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_title: 'Admin Home',
      page_location: window.location.href,
      page_path: window.location.pathname,
    });

    const fetchData = async () => {
      try {
        const refPath = 'worksheets'; // Assuming your data is under 'users'
        const refData = ref(database, refPath);
        const snapshot = await get(refData);

        if (snapshot.exists()) {
          const items = snapshot.val();
          
          // Initialize counters
          const categoriesCount = {};
          const subjectsCount = {};
          const gradesCount = {};
          let totalWorksheets = 0;
          let totalPracticeQuestions = 0;

          Object.values(items).forEach((item) => {
            const { category, subject, grade } = item;

            // Update total counts based on category
            if (category) {
              if (category.includes('Workbook')) {
                totalWorksheets += 1;
              } 
            }

            // Update category count
            if (category in categoriesCount) {
              categoriesCount[category]++;
            } 

            // Update subject count
            if (subject in subjectsCount) {
              subjectsCount[subject]++;
            } else {
              subjectsCount[subject] = 1;
            }

            // Update grade count
            if (grade in gradesCount) {
              gradesCount[grade]++;
            } else {
              gradesCount[grade] = 1;
            }
          });

          setData({
            totalWorksheets,
            totalPracticeQuestions,
            categories: categoriesCount,
            subjects: subjectsCount,
            grades: gradesCount,
          });
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard>
            <CardContent>
              <Typography variant="h6">Total Worksheets</Typography>
              <Typography variant="h4">{data.totalWorksheets}</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard>
            <CardContent>
              <Typography variant="h6">Total Practice Questions</Typography>
              <Typography variant="h4">{data.totalPracticeQuestions}</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard>
            <CardContent>
              <Typography variant="h6">Categories</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {Object.entries(data.categories).map(([category, count]) => (
                  <Typography key={category} variant="body1">
                    <strong>{category}:</strong> {count}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard>
            <CardContent>
              <Typography variant="h6">Subjects</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {Object.entries(data.subjects).map(([subject, count]) => (
                  <Typography key={subject} variant="body1">
                    <strong>{subject}:</strong> {count}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard>
            <CardContent>
              <Typography variant="h6">Grades</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {Object.entries(data.grades).map(([grade, count]) => (
                  <Typography key={grade} variant="body1">
                    <strong>{grade}:</strong> {count}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </InfoCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminHome;
