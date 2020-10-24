import React from 'react';

import FeedbackMessage from '../components/FeedbackMessage/FeedbackMessage';

const withAuthLevelCheck = (WrappedComponent, requiredAuthLevel) => {
  // --- AUTH LEVELS --- //
  // level 1 = user
  // level 2 = project manager
  // level 3 = admin
  // level 4 = master admin

  return class extends React.Component {
    render() {
      if (requiredAuthLevel > localStorage.getItem('authorisation-level')) {
        return (
          <FeedbackMessage>
            You are not authorised to view this page.
          </FeedbackMessage>
        );
      } else {
        return (
          <WrappedComponent />
        );
      }
    };
  };
};

export default withAuthLevelCheck;