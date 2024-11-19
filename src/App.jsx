import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvide } from './context/AuthContext';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Define the domain that requires CAPTCHA verification
  const validDomain = 'teasonmike.io.vn';
  const currentDomain = window.location.hostname;

  // Normalize the domain by stripping the "www." if it exists
  const normalizedDomain = currentDomain.replace(/^www\./, '');

  // Log the current and normalized domain to check
  console.log("Current domain:", currentDomain);
  console.log("Normalized domain:", normalizedDomain);

  // Check if the normalized domain matches the one that requires CAPTCHA
  const shouldVerifyCaptcha = normalizedDomain === validDomain;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle navigation after CAPTCHA completion
  useEffect(() => {
    if (captchaCompleted) {
      setTimeout(() => {
        navigate(currentPath); 
      }, 2000);
    }
  }, [captchaCompleted, navigate]);

  useEffect(() => {
    const renderCaptcha = () => {
      if (shouldVerifyCaptcha && window.turnstile) {
        console.log("Rendering CAPTCHA for valid domain");
        window.turnstile.render("#myWidget", {
          sitekey: "0x4AAAAAAA0Ur9uX8CtDGMV0", 
          callback: function (token) {
            if (token) {
              setCaptchaError(false); // Clear any previous errors
              console.log(`Challenge Success: ${token}`);
              setTimeout(() => {
                setCaptchaCompleted(true); // Mark CAPTCHA as completed
                setTimeout(() => {
                  document.querySelector(".container").style.display = "flex";
                  document.getElementById("myWidget").style.display = "none";
                }, 2000); 
              }, 2000);
            } else {
              setCaptchaError(true); 
              console.error("CAPTCHA not completed, please try again.");
            }
          },
        });
      } else if (!shouldVerifyCaptcha) {
        // Skip CAPTCHA if the domain does not need verification
        console.log("Skipping CAPTCHA for non-valid domain");
        setCaptchaCompleted(true);
      } else {
        console.error("Turnstile API not ready or domain check failed");
      }
    };

    if (!loading && !captchaCompleted) {
      renderCaptcha();
    }
  }, [loading, captchaCompleted, shouldVerifyCaptcha]);

  useEffect(() => {
    window.onloadTurnstileCallback = () => { };
  }, []);

  // Show loading screen
  if (loading) {
    return <Loading />;
  }

  if (!captchaCompleted) {
    return (
      <div className="captcha-page">
        <div id="myWidget" className="captcha-container"></div>
      </div>
    );
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
