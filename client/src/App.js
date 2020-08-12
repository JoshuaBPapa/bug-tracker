import React from 'react';

import TableContainer from './components/Table/TableContainer';
import FormContainer from './components/UpsertForm/FormContainer';

import './style/main.scss';

function App() {
  return (
    <div>
      <FormContainer formFields={[
        {
          type: 'input',
          name: 'title',
          initValue: ''
        },
        {
          type: 'text area',
          name: 'description',
          initValue: ''
        }
      ]} />
    </div>
  );
}

export default App;
