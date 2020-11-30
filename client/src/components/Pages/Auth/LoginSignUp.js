import React, { useState } from 'react';

import Form from '../../Form/Form';
import PageTitle from '../../PageTitle/PageTitle';

import backArrow from '../../../assets/icons/backArrow.png';

const LoginSignUp = () => {
  const [isLoginSelected, setisLoginSelected] = useState(true);

  const loginFormFields = [
    {
      title: 'team name',
      key: 'teamName',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'username',
      key: 'username',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'password',
      key: 'password',
      element: 'input',
      type: 'password',
      initValue: ''
    }
  ];

  const signUpFormFields = [
    {
      title: 'team name',
      key: 'teamName',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'name',
      key: 'name',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'job title',
      key: 'jobTitle',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'email',
      key: 'email',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'username',
      key: 'username',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'password',
      key: 'password',
      element: 'input',
      type: 'password',
      initValue: ''
    },
    {
      title: 'confirm password',
      key: 'confirmPassword',
      element: 'input',
      type: 'password',
      initValue: ''
    }
  ];

  return (
    <div className="Pages Login-Sign-Up-Page">
      <div className="login-sign-up-form-wrapper">
        <PageTitle>
          bug tracker
        </PageTitle>
        {isLoginSelected ? (
          <>
            <Form
              formFields={loginFormFields}
              endpointToSendData="login" />
            <button
              onClick={() => setisLoginSelected(false)}
              className="login-sign-up-button">
              Don't have an account? Sign up
            </button>
          </>
        ) : (
            <>
              <button
                onClick={() => setisLoginSelected(true)}
                className="login-sign-up-button back-to-login-button">
                <img src={backArrow} alt="back arrow" />
                Go back to login
            </button>
              <Form
                formFields={signUpFormFields}
                endpointToSendData="signup" />
            </>
          )}
      </div>
    </div>
  );
};

export default LoginSignUp;