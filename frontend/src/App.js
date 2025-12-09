import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Resources from './components/Resources';
import Profile from './components/Profile';

function App() {
  const token = localStorage.getItem('token');

  const Protected = ({ children }) => {
    return token ? (
      <div style={{ minHeight: '100vh', background: '#000' }}>
        <Navbar />
        <div style={{ paddingLeft: '300px' }}>{children}</div>
      </div>
    ) : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/chat" element={<Protected><Chat /></Protected>} />
        <Route path="/resources" element={<Protected><Resources /></Protected>} />
        <Route path="/profile" element={<Protected><Profile /></Protected>} />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;