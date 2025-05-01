// client/src/pages/ProfilePage.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import apiService from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await apiService.profile.get();
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        if (err.error === 'Profile not found') {
          // This is fine, user will create a new profile
          setLoading(false);
        } else {
          setError('Failed to load profile. Please try again later.');
          setLoading(false);
        }
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      setSuccess(null);
      
      const response = await apiService.profile.update(values);
      setProfile(response.data);
      setSuccess('Profile updated successfully!');
      
      setSubmitting(false);
    } catch (err) {
      setError(err.error || 'Failed to update profile. Please try again.');
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Please <Link to="/login">login</Link> to view or update your profile.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your profile...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Your Profile</h1>
      
      {success && <Alert variant="success">{success}</Alert>}
      
      <ProfileForm 
        profile={profile} 
        onSubmit={handleSubmit} 
        error={error} 
      />
      
      <div className="mt-4">
        <p>
          <strong>Note:</strong> Keeping your profile updated helps us recommend the most relevant scholarships for you.
        </p>
        <p>
          <Link to="/recommended">View your recommended scholarships</Link> based on your profile information.
        </p>
      </div>
    </Container>
  );
};

export default ProfilePage;