const GeneticLab = require('../lib');

const { Selection, Mutation, Crossover } = GeneticLab;

const {
  createStochasticUniversalSampling,
} = Selection;

const { pointCrossover } = Crossover;

const { createMutation } = Mutation;

// A fitness function that optimizes for highest binary string value
function getFitness(individual) {
  return parseInt(individual, 2);
}

const population = ['10001010', '10010000', '11101010', '10100001'];
const selection = createStochasticUniversalSampling(getFitness, 2);
let parents = selection(population);

let newPopulation = [...parents, ...pointCrossover(...parents)];
const sample = ['1', '0'];
const mutateBinary = createMutation(sample);
let [alpha] = newPopulation;
newPopulation = [alpha, ...newPopulation.slice(1).map(mutateBinary)];
let generation = 0;

console.log(`Generation ${generation}: ${newPopulation}`);
console.log(`Fitness: ${newPopulation.map(getFitness)}\n`);

while (generation < 1000 && getFitness(alpha) !== 255) {
  parents = selection(newPopulation);
  newPopulation = [...parents, ...pointCrossover(...parents)];
  [alpha] = newPopulation;
  newPopulation = [alpha, ...newPopulation.slice(1).map(mutateBinary)];
  generation += 1;
  console.log(`Generation [${generation}]: ${newPopulation}`);
  console.log(`Fitness: ${newPopulation.map(getFitness)}\n`);
}
