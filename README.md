# Genetic Lab

A simple genetic algorithm library.

## Getting Started

### Installation

Add to existing project using npm or yarn.

```
npm install genetic-lab --save
```

```
yarn add genetic-lab
```

### Usage

Import the library to your project.

```js
const GeneticLab = require('genetic-lab');

// using ES6 import
// import GeneticLab from 'genetic-lab';

const { Selection, Mutation } = GeneticLab;

const {
  createRoulleteWheelSelection,
  createStochasticUniversalSampling,
  createRankSelection,
  createTournamentSelection,
} = Selection;

const { mutateBinary } = Mutation;
```

## Fitness

A fitness function should check the fitness of a single individual and return a number based on it's fitness score.

For example:

```js
// A fitness function that counts the number of 1 in a binary string.
function getFitness(individual) {
  return (individual.match(/1/g) || []).length;
}

getFitness('010111'); // => 4
```

## Selection

### createRoulleteWheelSelection(getFitness)

Creates a selection function that uses _Roullete Wheel_ method.

```js
const population = ['000', '111'];
const selection = createRoulleteWheelSelection(getFitness);
selection(population); // => ['111']
```

### createStochasticUniversalSampling(getFitness, count)

Creates a selection function that uses _Stochastic Universal Sampling_ method. Number of individuals selected is based on **count**.

```js
const population = ['000', '111', '101'];
const selection = createStochasticUniversalSampling(getFitness, 2);
selection(population); // => ['111', '101'] or ['101', '111']
```

### createRankSelection(getFitness, count)

Creates a selection function that uses _Rank Selection_ method. Number of individuals selected is based on **count**.

```js
const population = ['000', '111', '101'];
const selection = createRankSelection(getFitness, 2);
selection(population); // => ['111', '101']
```

### createTournamentSelection(getFitness, tournamentSize)

Creates a selection function that uses _Tournament Selection_ method. Size of tournament is dependent on **tournametSize**.

```js
const population = ['000', '111', '101'];
const selection = createTournamentSelection(getFitness, 2);
selection(population); // => ['111'] or ['101']
```

## Mutation

### mutateBinary(individual)

Mutates one random bit of a string binary.

```js
mutateBinary('000000'); // => '000100'
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
