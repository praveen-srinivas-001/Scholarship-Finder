// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';

// Import pages
import HomePage from './pages/HomePage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import ScholarshipDetailPage from './pages/ScholarshipDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecommendedScholarshipsPage from './pages/RecommendedScholarshipsPage';

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/scholarships" element={<ScholarshipsPage />} />
              <Route path="/scholarships/:id" element={<ScholarshipDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/recommended" 
                element={
                  <ProtectedRoute>
                    <RecommendedScholarshipsPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="bg-dark text-white py-4 mt-5">
            <Container>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div className="mb-3 mb-md-0">
                  <h5>Scholarship Finder</h5>
                  <p className="mb-0">Finding opportunities for your education</p>
                </div>
                <div>
                  <p className="mb-0">&copy; {new Date().getFullYear()} Scholarship Finder. All rights reserved.</p>
                </div>
              </div>
            </Container>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;