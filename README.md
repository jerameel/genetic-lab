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
const {Selection, Mutation} = GeneticLab;

const {
  createRoulleteWheelSelection,
  createStochasticUniversalSampling,
  createRankSelection,
  createTournamentSelection,
} = Selection;

const {
  mutateBinary,
} = Mutation;
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
Creates a selection function that uses *Roullete Wheel* method.
### createStochasticUniversalSampling(getFitness, count)
Creates a selection function that uses *Stochastic Universal Sampling* method. Number of individuals selected is based on **count**.
### createRankSelection(getFitness, count)
Creates a selection function that uses *Rank Selection* method. Number of individuals selected is based on **count**.
### createTournamentSelection(getFitness, tournamentSize)
Creates a selection function that uses *Tournament Selection* method. Size of tournament is dependent on **tournametSize**.

## Mutation
### mutateBinary(individual)
Mutates one random bit of a string binary.
```js
mutateBinary("000000"); // => '000100'
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
