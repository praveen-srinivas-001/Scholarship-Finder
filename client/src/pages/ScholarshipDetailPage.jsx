// client/src/pages/ScholarshipDetailPage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import apiService from '../services/api';

const ScholarshipDetailPage = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        const response = await apiService.scholarships.getById(id);
        setScholarship(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load scholarship details. Please try again later.');
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading scholarship details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/scholarships">
          <Button variant="outline-primary">Back to Scholarships</Button>
        </Link>
      </Container>
    );
  }

  if (!scholarship) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Scholarship not found</Alert>
        <Link to="/scholarships">
          <Button variant="outline-primary">Back to Scholarships</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Link to="/scholarships" className="btn btn-outline-secondary mb-4">
        &larr; Back to Scholarships
      </Link>
      
      <Card>
        <Card.Body>
          <Row>
            <Col md={8}>
              <h1>{scholarship.name}</h1>
              <p className="text-muted">Provided by {scholarship.provider}</p>
              
              <div className="mb-4">
                <Badge bg="primary" className="me-2 p-2">
                  Award Amount: ${scholarship.amount}
                </Badge>
                <Badge bg="info" className="me-2 p-2">
                  Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                </Badge>
              </div>
              
              <h5>Description</h5>
              <p>{scholarship.description}</p>
              
              <h5>Eligibility</h5>
              <p>{scholarship.eligibility}</p>
              
              {scholarship.requirements && (
                <>
                  <h5>Requirements</h5>
                  <p>{scholarship.requirements}</p>
                </>
              )}
            </Col>
            
            <Col md={4}>
              <Card className="bg-light">
                <Card.Body>
                  <Card.Title>Application Details</Card.Title>
                  
                  <div className="mb-3">
                    <strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}
                  </div>
                  
                  {scholarship.applicationProcess && (
                    <div className="mb-3">
                      <strong>Application Process:</strong>
                      <p>{scholarship.applicationProcess}</p>
                    </div>
                  )}
                  
                  <div className="d-grid gap-2">
                    <a href={scholarship.website} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                      Apply Now
                    </a>
                    
                    <Button variant="outline-primary">Save for Later</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScholarshipDetailPage;

