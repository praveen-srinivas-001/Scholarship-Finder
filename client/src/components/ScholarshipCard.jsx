
// client/src/components/ScholarshipCard.js
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ScholarshipCard = ({ scholarship }) => {
  return (
    <Card className="mb-4 scholarship-card">
      <Card.Body>
        <Card.Title>{scholarship.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Provider: {scholarship.provider}
        </Card.Subtitle>
        
        <div className="mb-2">
          <Badge bg="primary" className="me-1">
            ${scholarship.amount}
          </Badge>
          <Badge bg="info" className="me-1">
            Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
          </Badge>
        </div>
        
        <Card.Text>
          {scholarship.description.substring(0, 150)}...
        </Card.Text>
        
        <div className="d-flex justify-content-between">
          <Link to={`/scholarships/${scholarship._id}`}>
            <Button variant="outline-primary">View Details</Button>
          </Link>
          <a href={scholarship.website} target="_blank" rel="noopener noreferrer">
            <Button variant="outline-success">Apply Now</Button>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ScholarshipCard;
