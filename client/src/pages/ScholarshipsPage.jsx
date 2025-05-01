// client/src/pages/ScholarshipsPage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ScholarshipCard from '../components/ScholarshipCard';
import SearchBar from '../components/SearchBar';
import apiService from '../services/api';

const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const response = await apiService.scholarships.getAll();
        setScholarships(response.data);
        setFilteredScholarships(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load scholarships. Please try again later.');
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredScholarships(scholarships);
      return;
    }

    const filtered = scholarships.filter(scholarship => {
      const searchStr = query.toLowerCase();
      return (
        scholarship.name.toLowerCase().includes(searchStr) ||
        scholarship.provider.toLowerCase().includes(searchStr) ||
        scholarship.description.toLowerCase().includes(searchStr) ||
        (scholarship.eligibility && scholarship.eligibility.toLowerCase().includes(searchStr))
      );
    });
    
    setFilteredScholarships(filtered);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Available Scholarships</h1>
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading scholarships...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : filteredScholarships.length === 0 ? (
        <Alert variant="info">
          {searchQuery 
            ? `No scholarships found matching "${searchQuery}".` 
            : "No scholarships available at the moment."}
        </Alert>
      ) : (
        <Row>
          {filteredScholarships.map(scholarship => (
            <Col key={scholarship._id} md={6} lg={4}>
              <ScholarshipCard scholarship={scholarship} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ScholarshipsPage;
