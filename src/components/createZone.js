import React from 'react';
import Navbar from './navbar';
import ZoneList from './zoneList';
import ZoneForm from './zoneForm';

function Zone() { 
  return (
    <div>
      <Navbar/>

        <div className="flex-container">
            <div className="box"><ZoneForm/> </div>
            <div className="box"><ZoneList/></div>
        </div>
    </div>
  );
}

export default Zone;
