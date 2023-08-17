import React from 'react';
import Navbar from './navbar';
import ZoneList from './zoneList';
import ZoneForm from './zoneForm';

function Zone() { 
  return (
    <div>
      <Navbar/>

        <div className='grid-container zone-margin'>
            <div className='grid-child '><ZoneForm/> </div>
            <div className='grid-child '><ZoneList/></div>
        </div>
    </div>
  );
}

export default Zone;
