import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { CandleConcert } from './components/CandleConcert';
import { NotFound } from './components/NotFound';
import { Visitor } from './components/Visitor';
import { ScrollToTop } from './components/ScrollToTop';
import MinyEvents from './pages/MinyEvents';
import Success from './pages/Success';

const AppContent = () => {
  const location = useLocation();
  const isMinyEventsPage = location.pathname === '/miny-events';
  const shouldApplyMainStyles = location.pathname === '/' || location.pathname === '/candle';

  return (
    <div className={shouldApplyMainStyles ? 'text-[10px] font-["Montserrat"] font-black' : ''}>
      {!isMinyEventsPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candle" element={<CandleConcert />} />
        <Route path="/visitor" element={<Visitor />} />
        <Route path="/miny-events" element={<MinyEvents />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;