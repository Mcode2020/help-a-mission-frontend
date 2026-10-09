import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Campaigns from '../pages/Campaigns/Campaigns';
import OurWork from '../pages/OurWork/OurWork';
import Donate from '../pages/Donate/Donate';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import MembersPage from '../pages/Members/MembersPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root redirect to default /en/ */}
      <Route path="/" element={<Navigate to="/en/" replace />} />

      {/* Language-aware routes */}
      <Route path="/:lang">
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="our-work" element={<OurWork />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="donate" element={<Donate />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      {/* Non-prefixed route fallbacks */}
      <Route path="/about" element={<Navigate to="/en/about" replace />} />
      <Route path="/our-work" element={<Navigate to="/en/our-work" replace />} />
      <Route path="/campaigns" element={<Navigate to="/en/campaigns" replace />} />
      <Route path="/members" element={<Navigate to="/en/members" replace />} />
      <Route path="/donate" element={<Navigate to="/en/donate" replace />} />
      <Route path="/contact" element={<Navigate to="/en/contact" replace />} />
      <Route path="/login" element={<Navigate to="/en/login" replace />} />
      <Route path="/signup" element={<Navigate to="/en/signup" replace />} />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/en/" replace />} />
    </Routes>
  );
};


export default AppRoutes;
