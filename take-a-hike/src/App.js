import React from 'react';
// import Navbar from './components/Navbar';
import Header from './components/Header';
// import {BrowserRouter as Router, Route} from "react-router-dom";
import Search from './pages/Search'
import './App.css';

console.log(process.env.REACT_APP_API_KEY);

const App = () => (
  
  <div>
    <Header/>
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
    <Search/>
    </div>
</div>
);

export default App;
