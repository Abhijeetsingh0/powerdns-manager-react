import React,{useEffect, useState} from 'react';
import axios from 'axios'


function ZoneList() { 
    const [zoneList, setZoneList] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(()=>{
        const headers = {
            'X-API-Key': apiKey
        };
        // Make an HTTP GET request
       axios.get(process.env.REACT_APP_API_HOST+":"+process.env.REACT_APP_API_PORT+'/api/v1/servers/localhost/zones', { headers })
      .then(response => {
        setZoneList(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
    },[])

    return (
        <div>
            <h2>Zones</h2>
                <div className="zonelist">  
                    <ul>
                        {zoneList.map(zone => (
                        <li key={zone.id}>{zone.name}</li>
                        ))}
                    </ul>
                </div>
        </div>
    );
}

export default ZoneList;



