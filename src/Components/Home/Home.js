import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import science from "../../assets/images/Science.jpg";
import math from "../../assets/images/Math.jpg";
import workbook from "../../assets/images/workbook.jpg";

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

const Home = () => {
  return (
    <Container>
      {/* Banner Image */}
      <Box sx={{ mb: 4 }}>
        <img
          src={math}
          alt="Learning Platform Banner"
          style={bannerStyle}
        />
      </Box>

      {/* Hero Section */}
      <Box sx={heroSectionStyle}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to the Learning Fun Zone!
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover a world of engaging worksheets and practice question sheets designed to make learning Math and Science fun and effective. Our resources are tailored for students from Kindergarten through Grade 10.
        </Typography>
        <Typography variant="h6" component="p">
          Whether you're preparing for exams or looking to enhance your understanding of key concepts, our worksheets offer valuable practice and are available for immediate download.
        </Typography>
      </Box>

      {/* Feature Points Section */}
      <Box sx={sectionStyle}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                image={workbook}
                alt="Feature 1"
              />
              <CardContent>
                <Typography variant="h6" component="div">
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
                image={science}
                alt="Feature 2"
              />
              <CardContent>
                <Typography variant="h6" component="div">
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
                image={math}
                alt="Feature 3"
              />
              <CardContent>
                <Typography variant="h6" component="div">
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
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Benefits
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                image={workbook}
                alt="Benefit 1"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Enhanced Learning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our worksheets are designed to enhance learning and comprehension.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                image={science}
                alt="Benefit 2"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Flexible Access
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access our resources anytime, anywhere, on any device.
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
                <Typography variant="h6" component="div">
                  Comprehensive Coverage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comprehensive coverage of subjects to ensure well-rounded education.
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
