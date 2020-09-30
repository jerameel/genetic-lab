"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function weightedSelection(population, getFitness, config) {
    var _a;
    const populationFitness = population.map(getFitness);
    const totalFitness = populationFitness.reduce((sum, x) => sum + x, 0);
    const weights = populationFitness.map(fitness => {
        if (fitness === Infinity && totalFitness === Infinity) {
            return 1;
        }
        return fitness / (totalFitness === 0 ? 1 : totalFitness);
    });
    const randomNumber = (((_a = config) === null || _a === void 0 ? void 0 : _a.randomizer) || Math.random)();
    let s = 0;
    const targetIndex = population.findIndex((v, i) => {
        s += weights[i];
        return randomNumber < s;
    });
    return targetIndex >= 0
        ? population[targetIndex]
        : population[population.length - 1];
}
exports.weightedSelection = weightedSelection;
function createStochasticUniversalSampling(getFitness, config) {
    return (population) => {
        if (population.length === 1) {
            return population;
        }
        const result = [];
        const populationClone = population.slice();
        while (result.length < config.count && populationClone.length > 0) {
            const individual = weightedSelection(populationClone, getFitness, {
                randomizer: config.randomizer,
            });
            result.push(individual);
            populationClone.splice(populationClone.indexOf(individual), 1);
        }
        return result;
    };
}
exports.createStochasticUniversalSampling = createStochasticUniversalSampling;
function createRoulleteWheelSelection(getFitness, config) {
    return createStochasticUniversalSampling(getFitness, Object.assign(Object.assign({}, config), { count: 1 }));
}
exports.createRoulleteWheelSelection = createRoulleteWheelSelection;
function createTournamentSelection(getFitness, tournamentSize, config) {
    return (population) => {
        var _a;
        const selection = createRoulleteWheelSelection(getFitness);
        const tournamentPopulation = [];
        const populationClone = population.slice();
        while (tournamentPopulation.length < tournamentSize &&
            tournamentPopulation.length < populationClone.length) {
            const i = Math.floor((((_a = config) === null || _a === void 0 ? void 0 : _a.randomizer) || Math.random)() * populationClone.length);
            tournamentPopulation.push(populationClone[i]);
            populationClone.splice(i, 1);
        }
        return selection(tournamentPopulation);
    };
}
exports.createTournamentSelection = createTournamentSelection;
function createRankSelection(getFitness, config) {
    return (population) => {
        if (population.length === 1) {
            return population;
        }
        const result = [];
        const ranking = population
            .slice()
            .sort((a, b) => getFitness(b) - getFitness(a));
        while (result.length < config.count && ranking.length > 0) {
            const individual = weightedSelection(ranking, (value, index = 0) => ranking.length - index, { randomizer: config.randomizer });
            result.push(individual);
            ranking.splice(ranking.indexOf(individual), 1);
        }
        return result;
    };
}
exports.createRankSelection = createRankSelection;
