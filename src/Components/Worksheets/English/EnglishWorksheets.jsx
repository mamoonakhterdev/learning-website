import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import 'animate.css';

import english1 from '../../../assets/images/english1.jpg'; // Update the image paths accordingly
import english2 from '../../../assets/images/english2.jpg'; // Update the image paths accordingly
import rightImage1 from '../../../assets/images/worksheetbrowse.jpg';
import rightImage2 from '../../../assets/images/educationtime.jpg';
import EnglishGradeContent from './EnglishGradeContent'; // Make sure to rename the corresponding component file
import { useNavigate } from 'react-router-dom';

const englishGrades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Kindergarten'];

const EnglishWorksheet = () => {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Trigger animation on component mount
    setAnimate(true);
    // Disable animation after initial load
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 1000); // Duration should be the same as the animation duration

    return () => clearTimeout(timer);
  }, []);

  const handleGradeClick = (grade) => {
    setLoading(true);
    setSelectedGrade(grade);

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 100); // Update every 100ms
  };
  const navigate = useNavigate();
  function backToWroksheet(){
    navigate('/free-worksheets');
  }

  return (
    <Container fluid>
      <Row className="my-4">
        {/* Left Container with Grades Box */}
        <Col xs={12} md={2} className="d-none d-md-block">
        <button className='btn btn-outline-dark mb-1' onClick={()=> backToWroksheet()}>&#x2190; Back</button>

          <Box
            sx={{
              backgroundColor: '#f0f0f0',
              borderRadius: 2,
              boxShadow: 3,
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 'auto',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 2 }}>
              English Worksheets
            </Typography>
            <div style={{ width: '100%' }}>
              {englishGrades.map((grade) => (
                <Button
                  key={grade}
                  onClick={() => handleGradeClick(grade)}
                  className={`btn ${animate ? 'animate__animated animate__fadeIn' : ''} btn-primary`}
                  style={{
                    display: 'block',
                    width: '100%',
                    marginBottom: '0.5rem',
                    textTransform: 'none',
                  }}
                >
                  {grade}
                </Button>
              ))}
            </div>
          </Box>
          <Box
            component="img"
            src={english1}
            alt="English Worksheet Image 1"
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              borderRadius: 2,
              marginTop: 2,
              objectFit: 'cover',
            }}
          />
          <Box
            component="img"
            src={english2}
            alt="English Worksheet Image 2"
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              borderRadius: 2,
              marginTop: 2,
              objectFit: 'cover',
            }}
          />
        </Col>

        {/* Center Container */}
        <Col xs={12} md={8}>
          <Box className="text-center my-4">
            <Typography variant="h4" gutterBottom>English Worksheet</Typography>
            <Typography variant="body1" paragraph>
              Explore our collection of English worksheets designed to cover a broad range of topics including grammar, vocabulary, and reading comprehension. Our worksheets are crafted to engage students and enhance their understanding of the English language through various activities and exercises.
            </Typography>
            <Typography variant="h5" gutterBottom>English Worksheets By Grade</Typography>
            <Grid container spacing={2}>
              {englishGrades.map((grade) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={grade}>
                  <Button
                    type='button'
                    onClick={() => handleGradeClick(grade)}
                    className={`btn ${animate ? 'animate__animated animate__fadeIn' : ''}`}
                    style={{
                      display: 'block',
                      width: '100%',
                    }}
                  >
                    {grade}
                  </Button>
                </Grid>
              ))}
            </Grid>
            {/* Show loading bar if loading */}
            {loading && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Loading...</Typography>
                <LinearProgress variant="determinate" value={loadingProgress} />
              </Box>
            )}
            {/* Render content based on the selected grade */}
            {!loading && selectedGrade && <EnglishGradeContent grade={selectedGrade} />}
          </Box>
        </Col>

        {/* Right Container with Two Images */}
        <Col xs={12} md={2} className="d-none d-md-block">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={rightImage1}
              alt="Right Container Image 1"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '200px',
                borderRadius: 2,
                objectFit: 'cover',
              }}
            />
            <Box
              component="img"
              src={rightImage2}
              alt="Right Container Image 2"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '200px',
                borderRadius: 2,
                objectFit: 'cover',
              }}
            />
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default EnglishWorksheet;
