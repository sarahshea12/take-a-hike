import React, {useState} from 'react';
// import Navbar from './components/Navbar';
import Header from './components/Header';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Search from './pages/Search'
import Login from './pages/Login'
import './App.css';
import RegistrationForm from './pages/Signup';

console.log(process.env.REACT_APP_API_KEY);

function App() {
  // When the application starts, find out if a user is logged in
  const [user, setUser] = useState(null)

return ( 
  <Router>
   <Header />
   <Switch>
   <Route exact path="/" render={(props) => (
     <Login {...props} setUser={setUser} />
   )}>

   </Route>
   <Route exact path="/mainpage" >
     <Search props={user, setUser}/>
   </Route>
   <Route exact path="/signup">
     <RegistrationForm />
   </Route>
   
   </Switch>

 </Router>
);  
}
//21-MERN/01/05-stu route react router
export default App;