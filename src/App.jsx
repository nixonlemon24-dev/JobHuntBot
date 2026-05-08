import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home'; 
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import UserJobs from './pages/UserJobs.jsx';
import ForgotPassword from './pages/Forgotpass.jsx';
import './App.css'
import './signup.css'


function App() {
  return (
//  <AuthProvider>
  <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/user-jobs' element={<UserJobs />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
      </Routes>
    </div>
  // </AuthProvider>
  )
}

export default App
