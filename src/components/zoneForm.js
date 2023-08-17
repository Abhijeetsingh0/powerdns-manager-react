import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ZoneForm = (props) => {
  const [inputName, setInputName] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const [error , setError] = useState('');
  const [submit, setSubmit] = useState(false); 

  const handleInputChange = (e) => {
    setInputName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault(); // Prevent page refresh

    const url = process.env.REACT_APP_API_HOST+":"+process.env.REACT_APP_API_PORT+'/api/v1/servers/localhost/zones';
  
    const headers = {
      'X-API-Key': password,
      'Content-Type': 'application/json'
    };
  
    const requestData = {
      "kind": 'Master',
      "name": inputName+".",
      "nameservers": []
    };
  
    axios.post(url, requestData, { headers })
    .then(response => {
        setResponse(response.data);
        setError(null)
        setSubmit(true)
    })
    .catch(error => {
        if (error && error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred.');
        }
        setResponse(null);
    });
  };

  if(submit){
    return <Navigate replace to="/Record" />
  }

  return (
    <div>
      <h2>Enter Zone Name and Password</h2>
      <form className='my-form'>
        <input
          id="input_id"
          type="text"
          placeholder="Enter zone name"
          value={inputName}
          onChange={handleInputChange}
        />

        <br className='top-margin' />
        <br />
        <input
        id="input_id"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br className='top-margin' />
        <br />

        <button className='form-button-zone'  type="button" onClick={submitForm}>
          Submit
        </button>
      </form>

    {error && (
    <div className='error-message' >
    <h3>Error:</h3>
    <p>{error}</p>
    </div>
    )}

    {response && (
    <div>
    <h3>Response:</h3>
    <pre>{console.log(response)}</pre>
    </div>
    )}


    </div>
  );
};

export default ZoneForm;

