import axios from 'axios';
import { Team, Application } from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const teamService = {
    getTeams: async (): Promise<Team[]> => {
        const response = await api.get<Team[]>('/teams/');
        return response.data;
    },

    createTeam: async (teamData: {
        name: string;
        project_idea: string;
        required_skills: string[];
        max_members: number;
    }): Promise<Team> => {
        try {
            const response = await api.post<Team>('/teams/', teamData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create team');
            }
            throw error;
        }
    },

    applyToTeam: async (teamId: number): Promise<Application> => {
        const response = await api.post<Application>(`/teams/${teamId}/apply/`);
        return response.data;
    },

    handleApplication: async (
        teamId: number,
        applicationId: number,
        action: 'accept' | 'reject'
    ): Promise<Application> => {
        try {
            const response = await api.post<Application>(`/teams/${teamId}/handle_application/`, {
                application_id: applicationId,
                action
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || `Failed to ${action} application`);
            }
            throw error;
        }
    }
}; 