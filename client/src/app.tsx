import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
