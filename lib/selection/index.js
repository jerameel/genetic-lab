const Selection = require('./selection');

const {
  createRankSelection,
  createStochasticUniversalSampling,
  createRoulleteWheelSelection,
  createTournamentSelection,
} = Selection;

module.exports = {
  createRankSelection,
  createStochasticUniversalSampling,
  createRoulleteWheelSelection,
  createTournamentSelection,
};
