// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import science from "../../assets/images/Science.jpg";
import math from "../../assets/images/Math.jpg";
import workbook from "../../assets/images/workbook.jpg";
import banner from "../../assets/images/banner.jpg";
import education from "../../assets/images/education.jpg";
import educationtime from "../../assets/images/educationtime.jpg";
import robot from "../../assets/images/robot.jpg";
import kidz from "../../assets/images/kidz.jpg";
import englishWorksheet from "../../assets/images/englishWorksheets.jpg"; // New image
import scienceWorksheet from "../../assets/images/scienceWorksheets.jpg"; // New image
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig'; // Import Firebase analytics config
import { useNavigate } from 'react-router-dom';

const heroSectionStyle = {
  backgroundColor: '#f0f0f0',
  padding: '60px 20px',
  textAlign: 'center',
  marginBottom: '40px',
};

const bannerStyle = {
  width: '100%',
  height: 'auto',
  marginBottom: '20px',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const sectionStyle = {
  marginBottom: '40px',
};

const downloadSectionStyle = {
  marginBottom: '40px',
  textAlign: 'center',
};

const cardMediaStyle = {
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
};

const cardMediaHoverStyle = {
  transform: 'scale(1.05)',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
};

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_title: 'Home',
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  const handleRedirect = (path) => {
    navigate(path);
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = cardMediaHoverStyle.transform;
    e.currentTarget.style.boxShadow = cardMediaHoverStyle.boxShadow;
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'none';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <Container>
      {/* Banner Image */}
      <Box sx={{ mb: 4 }}>
        <img
          src={banner}
          alt="Learning Platform Banner"
          style={bannerStyle}
        />
      </Box>

      {/* Hero Section */}
      <Box sx={heroSectionStyle}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}
        >
          Welcome to the Learning Fun Zone!
        </Typography>
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' } }}
        >
          Discover a world of engaging worksheets and practice question sheets designed to make learning Math and Science fun and effective. Our resources are tailored for students from Kindergarten through Grade 10.
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ fontSize: { xs: '0.875rem', sm: '1.125rem', md: '1.25rem' } }}
        >
          Whether you're preparing for exams or looking to enhance your understanding of key concepts, our worksheets offer valuable practice and are available for immediate download.
        </Typography>
      </Box>

      {/* Free Download Worksheets Section */}
      <Box sx={downloadSectionStyle}>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle} onClick={() => handleRedirect('/english')}>
              <CardMedia
                component="img"
                image={englishWorksheet}
                alt="English Worksheet"
                sx={cardMediaStyle}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
                >
                  English Worksheets
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Download Free English Worksheets from Kindergarten to Grade 8
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle} onClick={() => handleRedirect('/science')}>
              <CardMedia
                component="img"
                image={scienceWorksheet}
                alt="Science Worksheet"
                sx={cardMediaStyle}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
                >
                  Science Worksheets
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Download Free Science Worksheets from Kindergarten to Grade 8
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Feature Points Section */}
      <Box sx={sectionStyle}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                image={kidz}
                alt="Feature 1"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
                >
                  Interactive Worksheets
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Engage with interactive worksheets that adapt to your learning style.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                image={educationtime}
                alt="Feature 2"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
                >
                  Grade-Specific Content
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Worksheets and questions tailored for grades 1 to 10 and kindergarten.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                image={robot}
                alt="Feature 3"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
                >
                  User-Friendly Interface
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Navigate easily through a clean and intuitive interface designed for all ages.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Benefits Points Section */}
      <Box sx={sectionStyle}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
        >
          Benefits
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                image={education}
                alt="Benefit 1"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
                >
                  Improved Learning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enhance understanding and retention with practice materials that make learning engaging.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                image={workbook}
                alt="Benefit 2"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
                >
                  Accessible Resources
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access a wide range of downloadable worksheets anytime, anywhere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                image={math}
                alt="Benefit 3"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
                >
                  Boost Academic Performance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Regular practice with our worksheets helps improve academic performance and build confidence.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
