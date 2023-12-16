import './App.css';
import { useEffect, useState } from 'react';
import SignIn from './components/LoginPages/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import LogIn from './components/LoginPages/Login';
import SignUp from './components/LoginPages/SignUp';
import { Login } from '@mui/icons-material';

function App() {

  const[login, setMessage] = useState("") ;


  useEffect(()=>{

  })

  useEffect(()=>{
    async function getData(){
      try{ 
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        };
      let req = await fetch("http://localhost:8080/hello",options) ; 
      let data = await req.json() ; 
      setMessage(data.name); 
      }
      catch(e){
        console.log(e) ; 
      }
    }

    getData(); 
  },[])


  return (
   
    <Router>
    <Routes>
      <Route exact path="/" element={<LogIn/>} />
      <Route path="/home/:userId" element={<Home />} />
      <Route path="/signUp" element={<SignUp/>} />
      <Route path="/*" element={<LogIn/>} />
    </Routes>
  </Router>
  );
}

export default App;
