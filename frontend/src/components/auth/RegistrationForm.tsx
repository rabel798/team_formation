import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RegistrationData, UserRole } from '../../types';

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegistrationData>({
        username: '',
        email: '',
        password: '',
        password2: '',
        role: '' as UserRole,
        skills: [],
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const skills = e.target.value.split(',').map(skill => skill.trim());
        setFormData({
            ...formData,
            skills
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register/', formData);
            // Redirect based on role
            const redirectPath = formData.role === 'LEADER' ? '/leader-dashboard' : '/applicant-dashboard';
            navigate(redirectPath);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="registration-container">
            <h2>Join Hackathon Team Builder</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label>Choose Your Role:</label>
                    <select 
                        name="role" 
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a role</option>
                        <option value="LEADER">Team Leader</option>
                        <option value="APPLICANT">Team Applicant</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Skills (comma-separated):</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills.join(', ')}
                        onChange={handleSkillsChange}
                        placeholder="e.g., Python, React, Django"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="submit-button">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm; 