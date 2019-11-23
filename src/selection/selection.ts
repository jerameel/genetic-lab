import { FitnessFunction, Individual, Population } from '../types';

export function weightedSelection(
  population: Population,
  getFitness: (individual: Individual, index?: number) => number,
) {
  const populationFitness = population.map(getFitness);
  const totalFitness = populationFitness.reduce((sum, x) => sum + x, 0);

  const weights = populationFitness.map(fitness => {
    if (fitness === Infinity && totalFitness === Infinity) {
      return 1;
    }
    return fitness / (totalFitness === 0 ? 1 : totalFitness);
  });

  const randomNumber = Math.random();
  let s = 0;

  const targetIndex = population.findIndex((v, i) => {
    s += weights[i];
    return randomNumber < s;
  });

  return targetIndex >= 0
    ? population[targetIndex]
    : population[population.length - 1];
}

export function createStochasticUniversalSampling(
  getFitness: FitnessFunction,
  count: number,
) {
  return (population: Population) => {
    if (population.length === 1) {
      return population;
    }

    const result = [];

    const populationClone = population.slice();

    while (result.length < count && populationClone.length > 0) {
      const individual = weightedSelection(populationClone, getFitness);
      result.push(individual);
      populationClone.splice(populationClone.indexOf(individual), 1);
    }

    return result;
  };
}

export function createRoulleteWheelSelection(getFitness: FitnessFunction) {
  return createStochasticUniversalSampling(getFitness, 1);
}

export function createTournamentSelection(
  getFitness: FitnessFunction,
  tournamentSize: number,
) {
  return (population: Population) => {
    const selection = createRoulleteWheelSelection(getFitness);
    const tournamentPopulation = [];
    const populationClone = population.slice();

    while (
      tournamentPopulation.length < tournamentSize &&
      tournamentPopulation.length < populationClone.length
    ) {
      const i = Math.floor(Math.random() * populationClone.length);
      tournamentPopulation.push(populationClone[i]);
      populationClone.splice(i, 1);
    }

    return selection(tournamentPopulation);
  };
}

export function createRankSelection(
  getFitness: FitnessFunction,
  count: number,
) {
  return (population: Population) => {
    if (population.length === 1) {
      return population;
    }

    const result = [];

    const ranking = population
      .slice()
      .sort((a, b) => getFitness(b) - getFitness(a));
    while (result.length < count && ranking.length > 0) {
      const individual = weightedSelection(
        ranking,
        (value: string, index: number = 0) => ranking.length - index,
      );
      result.push(individual);
      ranking.splice(ranking.indexOf(individual), 1);
    }

    return result;
  };
}
