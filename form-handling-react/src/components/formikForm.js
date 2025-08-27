import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define the validation schema using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username must be at least 2 characters.')
    .max(50, 'Username must be 50 characters or less.')
    .required('Username is required.'),
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Password is required.'),
});

const FormikForm = () => {
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission with Formik
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Mock API call to simulate user registration
    console.log('Submitting with Formik:', values);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('Registration successful!');
      resetForm();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Registration (Formik)</h2>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white font-semibold py-2 rounded-lg transition-colors ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Register'}
              </button>
              {successMessage && (
                <p className="text-green-500 text-center mt-4">{successMessage}</p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormikForm;