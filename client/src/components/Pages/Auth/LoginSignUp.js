import React, { useState } from 'react';

import SignUpForm from '../../Forms/SignUpForm';
import LoginForm from '../../Forms/LoginForm';
import FormContainer from '../../Forms/FormContainer';

const LoginSignUp = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  if (!isSigningUp) {
    return (
      <>
        <FormContainer endpointToSendData="login">
          <LoginForm />
        </FormContainer>
        <button onClick={() => { setIsSigningUp(true) }}>
          Don't have an account? Sign up
        </button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => { setIsSigningUp(false) }}>
          Go back to login
        </button>
        <FormContainer endpointToSendData="signup">
          <SignUpForm />
        </FormContainer>
      </>
    );
  }
};

export default LoginSignUp;