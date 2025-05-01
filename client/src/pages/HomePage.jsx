// client/src/pages/HomePage.js
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col lg={6} className="mb-4 mb-lg-0">
          <h1>Find the Perfect Scholarship for Your Education</h1>
          <p className="lead">
            Our scholarship finder helps you discover financial aid opportunities 
            tailored to your academic profile, interests, and background.
          </p>
          <div className="mt-4">
            <Link to="/scholarships">
              <Button variant="primary" size="lg" className="me-3">
                Browse Scholarships
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline-primary" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
        </Col>
        <Col lg={6}>
          <img 
            src="/api/placeholder/600/400" 
            alt="Students celebrating scholarship" 
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>
      
      <h2 className="text-center mb-4">How It Works</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <div className="mb-3">
                <span className="display-4 text-primary">1</span>
              </div>
              <Card.Title>Create Your Profile</Card.Title>
              <Card.Text>
                Sign up and fill in your academic information, interests, and qualifications.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <div className="mb-3">
                <span className="display-4 text-primary">2</span>
              </div>
              <Card.Title>Get Personalized Recommendations</Card.Title>
              <Card.Text>
                Our algorithm matches your profile with relevant scholarship opportunities.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <div className="mb-3">
                <span className="display-4 text-primary">3</span>
              </div>
              <Card.Title>Apply and Succeed</Card.Title>
              <Card.Text>
                Access application details, deadlines, and resources to increase your chances.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;





