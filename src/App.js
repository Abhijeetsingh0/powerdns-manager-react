import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import Record from './components/addRecord';
import Zone from './components/createZone';


function App() {
  console.log(process.env.REACT_APP_API_HOST)
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/Record' Component={Record}/>
      <Route path='/Zone' Component={Zone}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
