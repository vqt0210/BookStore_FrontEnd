import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvide } from './context/AuthContext';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show loading screen
  if (loading) {
    return <Loading />;
  }


  return (
    <AuthProvide>
      <Navbar />
      <main className="min-h-screen px-4 py-6 mx-auto max-w-screen-2xl font-primary">
        <Outlet />
      </main>
      <Footer />
    </AuthProvide>
  );
}

export default App;
