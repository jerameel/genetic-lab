const Mutation = require('../../lib/mutation/mutation');

const { mutateBinary } = Mutation;

describe('mutateBinary', () => {
  test('input length', () => {
    const input = '000000';
    const actual = mutateBinary(input).length;
    const expected = input.length;
    expect(actual).toBe(expected);
  });

  test('input mutation', () => {
    const input = '000000';
    const actual = mutateBinary(input);
    expect(actual).not.toBe(input);
  });
});
