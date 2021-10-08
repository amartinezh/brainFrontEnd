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
}