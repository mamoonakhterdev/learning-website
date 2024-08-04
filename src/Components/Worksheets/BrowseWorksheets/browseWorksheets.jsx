import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

//import mathIcon from '../../../assets/images/math-icon.png';
//import readingIcon from '../../../assets/images/reading-icon.png';
import education1 from '../../../assets/images/education.jpg';
import education2 from '../../../assets/images/educationtime.jpg';

const worksheets = [
  { 
    title: 'English Worksheets', 
    description: 'Our English worksheets for grades 1-8 are designed to enhance reading and writing skills. They include exercises on grammar, vocabulary, comprehension, and writing prompts. Whether you’re looking for practice with basic sentence structure or advanced language concepts, these worksheets offer a range of activities to support learning and development.',
    route: '/free-worksheets/english',
    image: education1
  },
  { 
    title: 'Science Worksheets', 
    description: 'Our science worksheets for grades 1-8 cover a wide range of topics including biology, chemistry, physics, earth sciences, and space. These worksheets help students understand scientific concepts through engaging activities and experiments.',
    route: '/free-worksheets/science',
    image: education2
  },
  // Add more worksheets as needed
];

const sideImages = [
  education1,
  education1,
  education1,
  education2,
  // Add more images as needed
];

const BrowseWorksheets = () => {
  return (
    <Container fluid>
      <Row className="my-4">
        {/* Left Container */}
        <Col xs={2} className="d-none d-md-block">
          {sideImages.map((image, index) => (
            <img key={index} src={image} alt={`side-img-${index}`} className="img-fluid mb-3" />
          ))}
        </Col>

        {/* Center Container */}
        <Col xs={12} md={8}>
          <h1 className="text-center my-4">Free Worksheets for Kids</h1>
          {worksheets.map((worksheet, index) => (
            <Row key={index} className="my-3 align-items-center">
              <Col xs={2} className="text-center">
                <img src={worksheet.image} alt={worksheet.title} className="img-fluid" />
              </Col>
              <Col xs={10}>
                <h2><Link to={worksheet.route}>{worksheet.title}</Link></h2>
                <p>{worksheet.description}</p>
              </Col>
            </Row>
          ))}
        </Col>

        {/* Right Container */}
        <Col xs={2} className="d-none d-md-block">
          {sideImages.map((image, index) => (
            <img key={index} src={image} alt={`side-img-${index}`} className="img-fluid mb-3" />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default BrowseWorksheets;
