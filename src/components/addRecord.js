// import React from 'react';
import Navbar from './navbar';


// function Record() { 
//   console.log("home ")
//   return (
//     <div>
//       <Navbar/>
//       <h1>Record page </h1>
//     </div>
//   );
// }

// export default Record;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Record = () => {
  const [zones, setZones] = useState([]);
  const [subDomain, setSubDomain] = useState('')
  const [selectedZone, setSelectedZone] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [ipAddress, setIpAddress] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

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

  return (
    <div>
        <Navbar/>
      <h2>Add Record</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Zone:</label>
        <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
          <option value="">Select a zone</option>
          {zones.map(zone => (
            <option key={zone.id} value={zone.name}>
              {zone.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Sub Domain"
          value={subDomain}
          onChange={subDomainChange}
        />

        <br />
        <label>Record Type:</label>
        <select value={recordType} onChange={(e) => setRecordType(e.target.value)}>
          <option value="A">A</option>
          <option value="CNAME">CNAME</option>
          {/* Add more record types as needed */}
        </select>

        <br />
        <label>IP Address:</label>
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />

        <br />
        <button type="submit">Add Record</button>
      </form>

      {error && <div>Error: {error}</div>}
      {response && <div>Response: {response}</div>}
    </div>
  );
};

export default Record;
