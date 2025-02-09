import React from 'react';
import './Dashboard.css';

const ApplicantDashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Available Teams</h1>
                <div className="search-bar">
                    <input type="text" placeholder="Search teams..." />
                    <select>
                        <option value="">All Technologies</option>
                        <option value="react">React</option>
                        <option value="python">Python</option>
                        <option value="node">Node.js</option>
                    </select>
                </div>
            </header>
            
            <div className="dashboard-content">
                <div className="teams-grid">
                    <div className="team-card">
                        <h3>Web Development Team</h3>
                        <p className="team-description">
                            Building a modern web application with React and Node.js
                        </p>
                        <div className="team-tech-stack">
                            <span className="tech-tag">React</span>
                            <span className="tech-tag">Node.js</span>
                            <span className="tech-tag">MongoDB</span>
                        </div>
                        <div className="team-footer">
                            <span>3/4 members</span>
                            <button className="apply-btn">Apply</button>
                        </div>
                    </div>
                    {/* Add more team cards here */}
                </div>
            </div>
        </div>
    );
};

export default ApplicantDashboard; 