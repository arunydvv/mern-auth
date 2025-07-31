import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/Login';
import VerifyeMAIL from './pages/VerifyeMAIL.JSX';
import ResetPassword from './pages/ResetPassword';


const App = () => {
  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/verify-email' element={<VerifyeMAIL/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
    </>
  );
}

export default App