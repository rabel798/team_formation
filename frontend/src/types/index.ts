export type UserRole = 'LEADER' | 'APPLICANT';

export interface User {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    skills: string[];
}

export interface Team {
    id: number;
    name: string;
    project_idea: string;
    required_skills: string[];
    max_members: number;
    members: User[];
    leader: User;
    is_full: boolean;
    applications: Application[];
}

export interface Application {
    id: number;
    user: User;
    team: Team;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    created_at: string;
}

export interface RegistrationData {
    username: string;
    email: string;
    password: string;
    password2: string;
    role: UserRole;
    skills: string[];
} 