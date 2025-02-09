import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { teamService } from '../../services/api';
import './TeamCreationForm.css';

interface TeamFormData {
    name: string;
    project_idea: string;
    required_skills: string[];
    max_members: number;
}

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

const TeamCreationForm: React.FC<Props> = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState<TeamFormData>({
        name: '',
        project_idea: '',
        required_skills: [],
        max_members: 4
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            await teamService.createTeam(formData);
            toast.success('Team created successfully!');
            onSuccess();
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Failed to create team');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
        setFormData({ ...formData, required_skills: skills });
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h2>Create New Team</h2>

                    <div className="form-group">
                        <label>Team Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            minLength={3}
                            maxLength={50}
                        />
                    </div>

                    <div className="form-group">
                        <label>Project Idea</label>
                        <textarea
                            value={formData.project_idea}
                            onChange={(e) => setFormData({ ...formData, project_idea: e.target.value })}
                            required
                            minLength={10}
                            maxLength={500}
                        />
                    </div>

                    <div className="form-group">
                        <label>Required Skills (comma-separated)</label>
                        <input
                            type="text"
                            value={formData.required_skills.join(', ')}
                            onChange={handleSkillsChange}
                            placeholder="e.g., React, Python, Django"
                        />
                    </div>

                    <div className="form-group">
                        <label>Maximum Team Members</label>
                        <input
                            type="number"
                            min="2"
                            max="10"
                            value={formData.max_members}
                            onChange={(e) => setFormData({ ...formData, max_members: parseInt(e.target.value) })}
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cancel-btn"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Team'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamCreationForm; 