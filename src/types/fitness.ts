import { Individual } from './individual';

export type FitnessFunction = (individual: Individual) => number;
