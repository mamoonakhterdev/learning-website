import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import 'animate.css';

import science1 from '../../../assets/images/Science.jpg'; // Update the image paths accordingly
import science2 from '../../../assets/images/Science1.jpg'; // Update the image paths accordingly
import rightImage1 from '../../../assets/images/worksheetbrowse.jpg';
import rightImage2 from '../../../assets/images/educationtime.jpg';
import ScienceGradeContent from './ScienceGradeContent'; // Make sure to rename the corresponding component file
import { useNavigate } from 'react-router-dom';

const scienceGrades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Kindergarten'];

const ScienceWorksheet = () => {
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
  const backToWorksheets = () => {
    navigate('/free-worksheets');
  };

  return (
    <Container fluid>
      <button className='btn btn-outline-dark mb-1' onClick={() => backToWorksheets()}>&#x2190; Back</button>

      <Row className="my-4">
        {/* Left Container with Grades Box */}
        <Col xs={12} md={2} className="d-none d-md-block">

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
              Science Worksheets
            </Typography>
            <div style={{ width: '100%' }}>
              {scienceGrades.map((grade) => (
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
            src={science1}
            alt="Science Worksheet Image 1"
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
            src={science2}
            alt="Science Worksheet Image 2"
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
            <Typography variant="h4" gutterBottom>Science Worksheet</Typography>
            <Typography variant="body1" paragraph>
              Explore our collection of Science worksheets designed to cover a broad range of topics including biology, chemistry, and physics. Our worksheets are crafted to engage students and enhance their understanding of scientific concepts through various activities and exercises.
            </Typography>
            
            {/* Conditionally render grade buttons */}
            {!selectedGrade && (
              <>
                <Typography variant="h5" gutterBottom>Science Worksheets By Grade</Typography>

                <Grid container spacing={2}>
                  {scienceGrades.map((grade) => (
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
              </>
            )}
            
            {/* Show loading bar if loading */}
            {loading && (
              <Box sx={{ width: '100%', marginTop: 2 }}>
                <LinearProgress variant="determinate" value={loadingProgress} />
              </Box>
            )}

            {/* Render ScienceGradeContent when a grade is selected and not loading */}
            {!loading && selectedGrade && <ScienceGradeContent grade={selectedGrade} />}
          </Box>
        </Col>

        {/* Right Container */}
        <Col xs={12} md={2} className="d-none d-md-block">
          <Box
            component="img"
            src={rightImage1}
            alt="Browse Worksheets"
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              borderRadius: 2,
              marginBottom: 2,
              objectFit: 'cover',
            }}
          />
          <Box
            component="img"
            src={rightImage2}
            alt="Education Time"
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              borderRadius: 2,
              objectFit: 'cover',
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ScienceWorksheet;
