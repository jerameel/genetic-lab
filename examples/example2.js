const GeneticLab = require('../lib');

const { Selection } = GeneticLab;
const { createStochasticUniversalSampling } = Selection;

// a fitness function to solve for x where f(x) = 0
function getFitness(x) {
  // this can be any equation where x is unknown and y is zero
  const y = 2 * x - 10;

  if (y === 0) {
    return 10 ** 1000;
  }
  return 1 / Math.abs(y);
}

function average(a, b) {
  return (a + b) / 2;
}

function crossover(parents) {
  return [
    parents[0],
    average(parents[0], parents[1]),
    average(parents[0], parents[1]) + 1,
    average(parents[0], parents[1]) - 1,
  ];
}

const population = [20, 10, 1, -1, -10, -20];
const selection = createStochasticUniversalSampling(getFitness, { count: 2 });
let parents = selection(population);
let newPopulation = crossover(parents);
let generation = 0;

console.log(`Generation ${generation}: ${newPopulation}`);

while (generation < 1000 && getFitness(newPopulation[0]) !== 10 ** 1000) {
  parents = selection(newPopulation);
  newPopulation = crossover(parents);
  generation += 1;
  console.log(`Generation ${generation}: ${newPopulation}`);
}

console.log(`Result: ${newPopulation[0]}`);
