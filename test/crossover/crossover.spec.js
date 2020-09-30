/* eslint-disable @typescript-eslint/no-var-requires */
const Crossover = require('../../lib/crossover/crossover');

const { pointCrossover, uniquePointCrossover } = Crossover;

describe('pointCrossover', () => {
  test('normal input [type 1]', () => {
    const input = ['ABCD', 'DCBA'];
    const expected = input;
    const actual = pointCrossover(...input);
    expect(actual.length).toBe(expected.length);
  });
  test('normal input [type 2]', () => {
    const input = ['ABCD', 'DCBA'];
    const expected = ['ABBA', 'DCCD'];
    const actual = pointCrossover(...input, 2);
    expect(actual).toEqual(expected);
  });
});

describe('uniquePointCrossover', () => {
  test('normal input [type 1]', () => {
    const input = ['ABCD', 'DCBA'];
    const expected = input;
    const actual = uniquePointCrossover(...input);
    expect(actual.length).toBe(expected.length);
  });
  test('normal input [type 2]', () => {
    const input = ['ABCD', 'DCBA'];
    const expected = ['ABDC', 'DCAB'];
    const actual = uniquePointCrossover(...input, 2);
    expect(actual).toEqual(expected);
  });
});
