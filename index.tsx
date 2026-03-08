import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingCream from './LandingCream';
import MicroLanding from './MicroLanding';
import SqueezePage from './SqueezePage';
import App from './App';
import Long2 from './Long2';

const ThemeSync = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.dataset.theme = pathname === '/3' ? 'dark' : 'light';
  }, [pathname]);
  return null;
};

// / → LandingCream (новая главная). /3 → MicroLanding (старый тёмный). /1 → App. /2 → Long2.
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Could not find root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeSync />
      <Routes>
        <Route path="/" element={<LandingCream />} />
        <Route path="/1" element={<App />} />
        <Route path="/2" element={<Long2 />} />
        <Route path="/3" element={<MicroLanding />} />
        <Route path="/squeeze" element={<SqueezePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
