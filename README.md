# Genetic Lab

[![npm version](https://badge.fury.io/js/genetic-lab.svg)](https://badge.fury.io/js/genetic-lab)

![](https://github.com/jerameel/genetic-lab/workflows/build%20pipeline/badge.svg)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight genetic algorithm library.

### Changelog [1.0.1]

- Added support for custom configuration, ex. custom randomizer function

For a more detailed list of updates, see [CHANGELOG](CHANGELOG.md).

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
const GeneticLab = require("genetic-lab");

// using ES6 import
// import GeneticLab from 'genetic-lab';

const { Selection, Mutation, Crossover } = GeneticLab;

const {
  createRoulleteWheelSelection,
  createStochasticUniversalSampling,
  createRankSelection,
  createTournamentSelection
} = Selection;

const { pointCrossover, uniquePointCrossover } = Crossover;

const { mutateOrder, createMutation } = Mutation;
```

Check the [examples](examples) for additional reference on using this library.

## Fitness

A fitness function should check the fitness of a single individual and return a number based on it's fitness score.

For example:

```js
// A fitness function that optimizes for highest binary string value
function getFitness(individual) {
  return parseInt(individual, 2);
}

getFitness("010111"); // => 23
```

## Selection

### createRoulleteWheelSelection(getFitness, config?)

Creates a selection function that uses _Roullete Wheel_ method.

```js
const population = ["000", "111"];
const selection = createRoulleteWheelSelection(getFitness);
selection(population); // => ['111']
```

#### Config (Optional)
 - randomizer?: `() => number`; // function that replaces `Math.random()`

### createStochasticUniversalSampling(getFitness, config)

Creates a selection function that uses _Stochastic Universal Sampling_ method. Number of individuals selected is based on **count**.

```js
const population = ["000", "111", "101"];
const selection = createStochasticUniversalSampling(getFitness, { count: 2 });
selection(population); // => ['111', '101'] or ['101', '111']
```

#### Config
 - randomizer?: `() => number`; // function that replaces `Math.random()`
 - count: `number`;

### createRankSelection(getFitness, config)

Creates a selection function that uses _Rank Selection_ method. Number of individuals selected is based on **count**.

```js
const population = ["000", "111", "101"];
const selection = createRankSelection(getFitness, { count: 2 });
selection(population); // => ['111', '101']
```

#### Config
 - randomizer?: `() => number`; // function that replaces `Math.random()`
 - count: `number`;

### createTournamentSelection(getFitness, tournamentSize, config?)

Creates a selection function that uses _Tournament Selection_ method. Size of tournament is dependent on **tournametSize**.

```js
const population = ["000", "111", "101"];
const selection = createTournamentSelection(getFitness, 2);
selection(population); // => ['111'] or ['101']
```

#### Config (Optional)
 - randomizer?: `() => number`; // function that replaces `Math.random()`


## Mutation

### mutateOrder(individual)

Swaps two genes randomly.

```js
mutateOrder("ABC"); // => 'BAC' or 'CBA' or 'BCA'
mutateOrder("10"); // => '01'
```

### createMutation(sample)

Creates a mutation function that randomly changes a gene based on **sample**.

```js
const sample = ["1", "0"];
const mutateBinary = createMutation(sample);
mutateBinary("10"); // => '11' or '00'
```

## Crossover

### pointCrossover(parentA, parentB, index)

Creates two offspring based on _parentA_ and _parentB_ using _index_ as point of crossover. If no index is provided, it would be assigned randomly.

```js
const pair = ["ABCD", "DCBA"];
pointCrossover(...pair, 2); // => ['ABBA', 'DCCD']
```

### uniquePointCrossover(parentA, parentB, index)

Creates two unique chromosome offsprings based on unique chromosomes of _parentA_ and _parentB_ using _index_ as point of crossover. If no index is provided, it would be assigned randomly.

```js
const pair = ["ABCD", "DCBA"];
uniquePointCrossover(...pair, 2); // => ['ABDC', 'DCAB']
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
