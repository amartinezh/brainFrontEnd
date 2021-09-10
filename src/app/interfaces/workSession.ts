import { Exercise } from './exercise';
import { Adult } from './adult';

export interface WorkSession {
    id: string;
    exercises: Exercise[];
    adult: Adult[];
    date: Date;
}