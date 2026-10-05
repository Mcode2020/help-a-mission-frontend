import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';

// Placeholder view for secondary pages
const PagePlaceholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="py-20 max-w-7xl mx-auto px-4 text-center">
    <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
    <p className="mt-3 text-gray-600">This section is being updated with active campaigns and details.</p>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<PagePlaceholder title="About Us" />} />
      <Route path="/our-work" element={<PagePlaceholder title="Our Work" />} />
      <Route path="/campaigns" element={<PagePlaceholder title="Campaigns" />} />
      <Route path="/contact" element={<PagePlaceholder title="Contact Us" />} />
      <Route path="/donate" element={<PagePlaceholder title="Donate Now" />} />
    </Routes>
  );
};
