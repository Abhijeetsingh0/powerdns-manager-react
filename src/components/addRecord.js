import Navbar from './navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Record = () => {
  const [zones, setZones] = useState([]);
  const [subDomain, setSubDomain] = useState('')
  const [selectedZone, setSelectedZone] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [ipAddress, setIpAddress] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [submit, setSubmit] = useState(false); 

  useEffect(() => {
    fetchZoneList();
  }, []);

  const subDomainChange = (e) =>{
    setSubDomain(e.target.value)
  }

  const fetchZoneList = () => {
    const url = process.env.REACT_APP_API_HOST+":"+process.env.REACT_APP_API_PORT+'/api/v1/servers/localhost/zones';
    const headers = {
      'X-API-Key': process.env.REACT_APP_API_KEY,
    };

    axios.get(url, { headers })
      .then(response => {
        setZones(response.data);
      })
      .catch(error => {
        setError('Error fetching zones.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = process.env.REACT_APP_API_HOST+":"+process.env.REACT_APP_API_PORT+`/api/v1/servers/localhost/zones/${selectedZone}`;
    const headers = {
      'X-API-Key': process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json',
    };

    const requestData = {
      rrsets: [
        {
          name: `${subDomain}.${selectedZone}`,
          type: recordType,
          ttl: 3600,
          changetype: 'REPLACE',
          records: [
            {
              content: ipAddress,
              disabled: false,
            },
          ],
        },
      ],
    };

    axios.patch(url, requestData, { headers })
      .then(response => {
        setResponse('Record added successfully.');
        setError('');
        setSubmit(true)
      })
      .catch(error => {
        if (error && error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred.');
        }
        setResponse('');
      });
  };

  if(submit){
    return( 
        <Navigate replace to="/" />
     )
  }

  return (
    <div>
    <Navbar/>
    <div className='flex-container'>
     <h2>Add Record</h2>
      <form className='record-form' onSubmit={handleSubmit}>
        <label  className='form-label'>Select Zone:</label>
        <select  className='form-select' value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
          <option value="">Select a zone</option>
          {zones.map(zone => (
            <option key={zone.id} value={zone.name}>
              {zone.name}
            </option>
          ))}
        </select>
        <br/>
        <label  className='form-label'>Sub Domain:</label>
        <input
          className='recordInput'
          type="text"
          placeholder="Sub Domain"
          value={subDomain}
          onChange={subDomainChange}
        />
        <br />
        <label  className='form-label'>Record Type:</label>
        <select className='typeInput' value={recordType} onChange={(e) => setRecordType(e.target.value)}>
          <option value="A">A</option>
          <option value="CNAME">CNAME</option>
          {/* Add more record types as needed */}
        </select>
        <br/>
        <label  className='form-label' >IP Address:</label>
        <input
          className='recordInput'
          type="text"
          placeholder='Enter the IP address'
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />
        <br/>
        <button  className='form-button' type="submit">Add Record</button>
      </form>

      {error && <div className='error-message' >Error: {error}</div>}
      {response && <div className='success-message'>Response: {response}</div>}
    </div>
    </div>
  );
};


export default Record;
