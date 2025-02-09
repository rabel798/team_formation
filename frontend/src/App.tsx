import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleSelection from './components/auth/RoleSelection';
import LeaderDashboard from './components/dashboard/LeaderDashboard';
import ApplicantDashboard from './components/dashboard/ApplicantDashboard';

const App: React.FC = () => {
  return (
    <div className="App fade-in">
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/leader" element={<LeaderDashboard />} />
        <Route path="/applicant" element={<ApplicantDashboard />} />
      </Routes>
    </div>
  );
};

export default App; 