import React, { useState } from 'react';

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessages(errorData.errors || ['Failed to create user']);
          throw new Error('Failed to create user');
        }
        setSignupSuccess(true);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div className="sign-up-form">
      {signupSuccess ? (
        <div className="success-message">
          <p>Thank you for joining the Sneaker World community! Click Log In in the top right corner to sign into your account.</p>
        </div>
      ) : (
        <>
          <div className="sign-up-form">
            <h2>Sign Up</h2>
            {errorMessages.length > 0 && (
              <div className="error-message">
                <ul>
                  {errorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleSignUp}>
              <label>
                Username:
                <input
                  className='form-input'
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  className='form-input'
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  className='form-input'
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Confirm Password:
                <input
                  className='form-input'
                  type="password"
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                />
              </label>
              <br />
              <button type="submit" className='form-button'>Sign Up</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default SignUpPage;
