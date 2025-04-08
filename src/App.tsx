import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { CandleConcert } from './components/CandleConcert';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candle" element={<CandleConcert />} />
      </Routes>
    </Router>
  );
}

export default App;