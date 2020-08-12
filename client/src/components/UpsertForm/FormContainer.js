import React, { useState, useEffect } from 'react';

const FormContainer = ({ formFields }) => {
  const initState = {};
  formFields.forEach(field => {
    const { name, initValue } = field;
    initState[name] = initValue;
  });
  const [formInput, setFormInput] = useState(initState);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/projects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formInput)
    })
    .then(res =>
      console.log(res)
    )
    .catch(err => {
      console.log(err)
    })
  };

  const handleInput = (e) => {
    const { target: { name, value } } = e;

    setFormInput(prevState => {
      const updatedState = { ...prevState };
      updatedState[name] = value;
      return updatedState;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formFields.map(field => (
          <label key={field.name}>
            {field.name}
            {field.type === 'input' ? (
              <input
                type="text"
                name={field.name}
                value={formInput[field.name]}
                onChange={handleInput} />
            ) : field.type === 'text area' ? (
              <textarea
                name={field.name}
                value={formInput[field.name]}
                onChange={handleInput} />
            ) : field.type === 'select' ? (
              <select
                name={field.name}
                value={formInput[field.name]}
                onChange={handleInput}>
                  {field.options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            ) : null}
          </label>
        ))}
        <button>Save</button>
        <button>Cancel</button>
      </form>
    </div>
  )
}

export default FormContainer;