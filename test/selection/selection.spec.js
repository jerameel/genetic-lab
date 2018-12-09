const Selection = require('../../lib/selection/selection');

const {
  createRoulleteWheelSelection,
  createStochasticUniversalSampling,
  createRankSelection,
  createTournamentSelection,
  weightedSelection,
} = Selection;

function getFitness(individual) {
  return (individual.match(/1/g) || []).length;
}

describe('weightedSelection', () => {
  test('single input', () => {
    const input = ['000000'];
    const actual = weightedSelection(input, getFitness);
    const expected = '000000';
    expect(actual).toBe(expected);
  });
  test('normal input', () => {
    const input = ['000000', '111111'];
    const actual = weightedSelection(input, getFitness);
    const expected = '111111';
    expect(actual).toBe(expected);
  });
});

describe('createRoulleteWheelSelection', () => {
  test('empty input', () => {
    const input = [];
    const actual = createRoulleteWheelSelection(getFitness)(input).length;
    const expected = 0;
    expect(actual).toBe(expected);
  });

  test('single input', () => {
    const input = ['000000'];
    const actual = createRoulleteWheelSelection(getFitness)(input)[0];
    const expected = input[0];
    expect(actual).toBe(expected);
  });

  test('zero total fitness', () => {
    const input = ['000000', '000000'];
    const actual = createRoulleteWheelSelection(getFitness)(input)[0];
    const expected = input[0];
    expect(actual).toBe(expected);
  });

  test('normal  input', () => {
    const input = ['111111', '000000'];
    const actual = createRoulleteWheelSelection(getFitness)(input)[0];
    const expected = input[0];
    expect(actual).toBe(expected);
  });
});

describe('createStochasticUniversalSampling', () => {
  test('count exceed input', () => {
    const input = ['000000', '000000'];
    const actual = createStochasticUniversalSampling(getFitness, input.length + 1)(input);
    const expected = input;
    expect(actual).toEqual(expected);
  });

  test('normal input', () => {
    const input = ['000010', '000011', '011010', '110111'];
    const count = 3;
    const actual = createStochasticUniversalSampling(getFitness, count)(input).length;
    const expected = count;
    expect(actual).toBe(expected);
  });
});

describe('createRankSelection', () => {
  test('empty input', () => {
    const input = [];
    const actual = createRankSelection(getFitness, 2)(input).length;
    const expected = 0;
    expect(actual).toBe(expected);
  });

  test('count exceed input', () => {
    const input = ['000000', '000000'];
    const actual = createRankSelection(getFitness, input.length + 1)(input);
    const expected = input;
    expect(actual).toEqual(expected);
  });

  test('normal input', () => {
    const input = ['000010', '000011', '011010', '110111'];
    const count = 3;
    const actual = createRankSelection(getFitness, count)(input).length;
    const expected = count;
    expect(actual).toBe(expected);
  });
});

describe('createTournamentSelection', () => {
  test('empty input', () => {
    const input = [];
    const actual = createTournamentSelection(getFitness, 2)(input).length;
    const expected = 0;
    expect(actual).toBe(expected);
  });

  test('tournament size exceed input', () => {
    const input = ['000000', '000000'];
    const actual = createTournamentSelection(getFitness, input.length + 1)(input)[0];
    const expected = input[0];
    expect(actual).toEqual(expected);
  });

  test('normal input', () => {
    const input = ['000010', '000011', '011010', '110111'];
    const count = 3;
    const actual = createTournamentSelection(getFitness, count)(input).length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
});
