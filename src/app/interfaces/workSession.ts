import { Exercise } from './exercise';
import { Adult } from './adult';
import { User } from './user';

export interface WorkSession {
    id: string;
    exercises: Exercise[];
    adult: Adult[];
    user: User;
    date: Date;
    results: string[];
    observations?: string;
}

export interface Session{
    id_user: string;
    id_adult: string;
    date: string;
    observations: string;
    exercises: Exercise[];
    exerciseObservations: string;
}