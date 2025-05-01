// client/src/pages/RecommendedScholarshipsPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ScholarshipCard from '../components/ScholarshipCard';
import apiService from '../services/api';
import { AuthContext } from '../context/AuthContext';

const RecommendedScholarshipsPage = () => {
  const { user } = useContext(AuthContext);
  const [scholarships, setScholarships] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get user profile
        const profileResponse = await apiService.profile.get();
        setProfile(profileResponse.data);
        
        // Get recommended scholarships
        const scholarshipsResponse = await apiService.scholarships.getRecommended();
        setScholarships(scholarshipsResponse.data);
        
        setLoading(false);
      } catch (err) {
        if (err.error === 'Profile not found') {
          setError('You need to create your profile to get personalized recommendations.');
        } else {
          setError('Failed to load recommended scholarships. Please try again later.');
        }
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Please <Link to="/login">login</Link> to view your recommended scholarships.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your recommended scholarships...</p>
      </Container>
    );
  }

  if (error && error.includes('create your profile')) {
    return (
      <Container className="py-5">
        <Alert variant="info">
          {error} <Link to="/profile">Create your profile now</Link> to get personalized recommendations.
        </Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Your Recommended Scholarships</h1>
      
      {profile && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Recommendations based on your profile</Card.Title>
            <Card.Text>
              <strong>Education Level:</strong> {profile.educationLevel}<br />
              <strong>Field of Study:</strong> {profile.fieldOfStudy}<br />
              <strong>GPA:</strong> {profile.gpa}<br />
              {profile.demographics && profile.demographics.length > 0 && (
                <><strong>Demographics:</strong> {profile.demographics.join(', ')}<br /></>
              )}
            </Card.Text>
            <Link to="/profile">Update your profile</Link>
          </Card.Body>
        </Card>
      )}
      
      {scholarships.length === 0 ? (
        <Alert variant="info">
          No matching scholarships found for your profile at the moment. Check back later or 
          <Link to="/scholarships"> browse all scholarships</Link>.
        </Alert>
      ) : (
        <Row>
          {scholarships.map(scholarship => (
            <Col key={scholarship._id} md={6} lg={4}>
              <ScholarshipCard scholarship={scholarship} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default RecommendedScholarshipsPage;
