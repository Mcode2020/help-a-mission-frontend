import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Campaigns from '../pages/Campaigns/Campaigns';
import OurWork from '../pages/OurWork/OurWork';
import Donate from '../pages/Donate/Donate';
import Contact from '../pages/Contact/Contact';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/our-work" element={<OurWork />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
