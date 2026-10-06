import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AboutPage from '../pages/About/AboutPage';
import CampaignsPage from '../pages/Campaigns/CampaignsPage';
import CampaignDetailPage from '../pages/Campaigns/CampaignDetailPage';
import DonatePage from '../pages/Donate/DonatePage';
import ContactPage from '../pages/Contact/ContactPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/our-work" element={<CampaignsPage />} />
      <Route path="/campaigns" element={<CampaignsPage />} />
      <Route path="/campaigns/:slug" element={<CampaignDetailPage />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;
