
// client/src/components/ProfileForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Col, Row, Alert } from 'react-bootstrap';

// Validation schema
const ProfileSchema = Yup.object().shape({
  educationLevel: Yup.string().required('Education level is required'),
  fieldOfStudy: Yup.string().required('Field of study is required'),
  gpa: Yup.number()
    .min(0, 'GPA must be between 0 and 4.0')
    .max(4.0, 'GPA must be between 0 and 4.0')
    .required('GPA is required'),
  demographics: Yup.array().of(Yup.string()),
  interests: Yup.array().of(Yup.string()),
  skills: Yup.array().of(Yup.string()),
  achievements: Yup.array().of(Yup.string())
});

const ProfileForm = ({ profile, onSubmit, error }) => {
  const initialValues = {
    educationLevel: profile?.educationLevel || '',
    fieldOfStudy: profile?.fieldOfStudy || '',
    gpa: profile?.gpa || '',
    demographics: profile?.demographics || [],
    interests: profile?.interests || [],
    skills: profile?.skills || [],
    achievements: profile?.achievements || []
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Your Profile</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          Update your profile to get personalized scholarship recommendations
        </Card.Subtitle>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue, isSubmitting }) => (
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="educationLevel" className="form-label">Education Level</label>
                    <Field
                      as="select"
                      id="educationLevel"
                      name="educationLevel"
                      className={`form-select ${errors.educationLevel && touched.educationLevel ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Education Level</option>
                      <option value="High School">High School</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Doctorate">Doctorate</option>
                    </Field>
                    <ErrorMessage name="educationLevel" component="div" className="invalid-feedback" />
                  </div>
                </Col>
                
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="fieldOfStudy" className="form-label">Field of Study</label>
                    <Field
                      type="text"
                      id="fieldOfStudy"
                      name="fieldOfStudy"
                      className={`form-control ${errors.fieldOfStudy && touched.fieldOfStudy ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="fieldOfStudy" component="div" className="invalid-feedback" />
                  </div>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="gpa" className="form-label">GPA</label>
                    <Field
                      type="number"
                      step="0.01"
                      id="gpa"
                      name="gpa"
                      className={`form-control ${errors.gpa && touched.gpa ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="gpa" component="div" className="invalid-feedback" />
                  </div>
                </Col>
                
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="demographics" className="form-label">Demographics (comma separated)</label>
                    <Field
                      type="text"
                      id="demographics"
                      name="demographics"
                      className="form-control"
                      value={values.demographics.join(', ')}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue(
                          'demographics',
                          value.split(',').map(item => item.trim()).filter(Boolean)
                        );
                      }}
                    />
                  </div>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="interests" className="form-label">Interests (comma separated)</label>
                    <Field
                      type="text"
                      id="interests"
                      name="interests"
                      className="form-control"
                      value={values.interests.join(', ')}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue(
                          'interests',
                          value.split(',').map(item => item.trim()).filter(Boolean)
                        );
                      }}
                    />
                  </div>
                </Col>
                
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="skills" className="form-label">Skills (comma separated)</label>
                    <Field
                      type="text"
                      id="skills"
                      name="skills"
                      className="form-control"
                      value={values.skills.join(', ')}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue(
                          'skills',
                          value.split(',').map(item => item.trim()).filter(Boolean)
                        );
                      }}
                    />
                  </div>
                </Col>
              </Row>
              
              <div className="mb-3">
                <label htmlFor="achievements" className="form-label">Achievements (comma separated)</label>
                <Field
                  type="text"
                  id="achievements"
                  name="achievements"
                  className="form-control"
                  value={values.achievements.join(', ')}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue(
                      'achievements',
                      value.split(',').map(item => item.trim()).filter(Boolean)
                    );
                  }}
                />
              </div>
              
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Profile'}
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default ProfileForm;