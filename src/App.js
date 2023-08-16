import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import Record from './components/addRecord';
import Zone from './components/createZone';


function App() {
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
