import React, { useState } from 'react';

import SignUpForm from '../../Forms/SignUpForm';
import LoginForm from '../../Forms/LoginForm';
import FormContainer from '../../Forms/FormContainer';
import PageTitle from '../../PageTitle/PageTitle';

import backArrow from '../../../assets/icons/backArrow.png';

const LoginSignUp = () => {
  const [isLoginSelected, setisLoginSelected] = useState(true);

  return (
    <div className="Login-Sign-Up-Page">
      <div className="login-sign-up-form-wrapper">
        <PageTitle>
          bug tracker
        </PageTitle>
        {isLoginSelected ? (
          <>
            <FormContainer endpointToSendData="login">
              <LoginForm />
            </FormContainer>
            <button 
              onClick={() => { setisLoginSelected(false) }}
              className="login-sign-up-button">
              Don't have an account? Sign up
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => { setisLoginSelected(true) }}
              className="login-sign-up-button back-to-login-button">
              <img src={backArrow} alt="back arrow" />
              Go back to login
            </button>
            <FormContainer endpointToSendData="signup">
              <SignUpForm />
            </FormContainer>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;