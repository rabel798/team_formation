import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import TeamCreationForm from '../teams/TeamCreationForm';
import { teamService } from '../../services/api';
import Loading from '../common/Loading';
import { Team } from '../../types';
import './Dashboard.css';

const LeaderDashboard: React.FC = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTeams = async () => {
        try {
            const response = await teamService.getTeams();
            setTeams(response);
        } catch (error) {
            toast.error('Failed to fetch teams');
        } finally {
            setLoading(false);
        }
    };

    const handleApplication = async (teamId: number, applicationId: number, action: 'accept' | 'reject') => {
        try {
            await teamService.handleApplication(teamId, applicationId, action);
            toast.success(`Application ${action}ed successfully`);
            fetchTeams();
        } catch (error) {
            toast.error(`Failed to ${action} application`);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="dashboard fade-in">
            <header className="dashboard-header">
                <h1>Team Leader Dashboard</h1>
                <button 
                    className="create-team-btn"
                    onClick={() => setShowCreateForm(true)}
                >
                    Create New Team
                </button>
            </header>
            
            <div className="dashboard-content">
                <div className="dashboard-card">
                    <h2>Your Teams</h2>
                    <div className="team-list">
                        {teams.map((team) => (
                            <div 
                                key={team.id}
                                className="team-item slide-in-left"
                            >
                                <h3>{team.name}</h3>
                                <p>Members: {team.members.length}/{team.max_members}</p>
                                <p>Tech: {team.required_skills.join(', ')}</p>
                                <div className="applications-section">
                                    <h4>Pending Applications ({team.applications.filter(app => app.status === 'PENDING').length})</h4>
                                    {team.applications
                                        .filter(app => app.status === 'PENDING')
                                        .map((application) => (
                                            <div key={application.id} className="application-item fade-in">
                                                <p>{application.user.username} wants to join</p>
                                                <div className="action-buttons">
                                                    <button
                                                        className="accept-btn"
                                                        onClick={() => handleApplication(team.id, application.id, 'accept')}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="reject-btn"
                                                        onClick={() => handleApplication(team.id, application.id, 'reject')}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showCreateForm && (
                <TeamCreationForm 
                    onClose={() => setShowCreateForm(false)}
                    onSuccess={fetchTeams}
                />
            )}
        </div>
    );
};

export default LeaderDashboard; 