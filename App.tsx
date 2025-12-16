import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Services from './pages/Services';
import Approach from './pages/Approach';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import MediaKit from './pages/MediaKit';
import Admin from './pages/Admin';
import Unsubscribe from './pages/Unsubscribe';

// Scroll to top component to handle navigation updates
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/approach" element={<Approach />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/media-kit" element={<MediaKit />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
