import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState<string>('');
    const navigate = useNavigate();

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
    };

    const handleContinue = () => {
        navigate(selectedRole === 'LEADER' ? '/leader' : '/applicant');
    };

    return (
        <div className="role-selection-container fade-in">
            <h1 className="slide-down">Welcome to Team Formation</h1>
            
            <div className="role-buttons">
                <button 
                    className={`role-button slide-in-left ${selectedRole === 'LEADER' ? 'selected' : ''}`}
                    onClick={() => handleRoleSelect('LEADER')}
                >
                    <h3>Team Leader</h3>
                    <p>Create and manage teams</p>
                </button>

                <button 
                    className={`role-button slide-in-right ${selectedRole === 'APPLICANT' ? 'selected' : ''}`}
                    onClick={() => handleRoleSelect('APPLICANT')}
                >
                    <h3>Team Applicant</h3>
                    <p>Find and join teams</p>
                </button>
            </div>

            {selectedRole && (
                <button 
                    className="continue-button slide-up"
                    onClick={handleContinue}
                >
                    Continue as {selectedRole}
                </button>
            )}
        </div>
    );
};

export default RoleSelection;