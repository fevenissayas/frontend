import React, { useState } from 'react';
import '../assets/styles/style.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // Email validation function
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation function
  const validatePassword = (password) => password.length >= 8;

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form is valid, submitting...', formData);
      setErrors({});
      setFormData({ email: '', password: '' });
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  return (
    <div className="container rounded-4 p-1 mt-5">
      <div className="card registration-card mx-auto shadow-lg rounded-4">
        <div className="row g-0 py-9">
          {/* Left Panel */}
          <div className="col-md-5 left-panel text-center text-white d-flex flex-column justify-content-center align-items-center bg-dark p-5 rounded-start">
            <div className="logo mb-4">
              <img
                width="180"
                height="180"
                src="/src/assets/images/image 1.png"
                alt="Logo"
              />
            </div>
            <h1 className="mb-4">HospitALL</h1>
            <p className="mb-0">
              Not Your Average Web – Simplify,
              <br />
              Organize, Achieve!
            </p>
          </div>

          {/* Right Panel */}
          <div className="col-md-7 right-panel p-5 rounded-end d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="mb-1 text-start w-100">Login</h1>
            <h4 className="text-muted mb-4 mt-3 ">
              Welcome back! Glad to see you again!
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className={`form-control rounded-3 ${
                    errors.email ? 'is-invalid' : ''
                  }`}
                  id="email"
                  placeholder="Email"
                  style={{ width: '250px' }}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className={`form-control rounded-3 ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                  id="password"
                  placeholder="Password"
                  style={{ width: '250px' }}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-dark w-100 rounded-3 mb-4"
                style={{ width: '250px' }}
              >
                Login
              </button>
            </form>
            <p className="text-center mt-4 mb-0">
              Do you have an account?{' '}
              <Link to="/signup" className="text-primary custom-link">
                Signup
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;