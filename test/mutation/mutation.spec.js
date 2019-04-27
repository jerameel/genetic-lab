const Mutation = require('../../lib/mutation/mutation');

const { mutateOrder, createMutation } = Mutation;

describe('mutateOrder', () => {
  test('normal input [type 1]', () => {
    const input = 'ABC';
    const expected = input;
    const actual = mutateOrder(input);
    expect(actual.length).toBe(expected.length);
    expect(actual).not.toBe(expected);
  });
});

describe('createMutation', () => {
  test('normal input [type 1]', () => {
    const mutate = createMutation(['0', '1']);
    const input = '100000';
    const expected = input;
    const actual = mutate(input);
    expect(actual.length).toBe(expected.length);
    expect(actual).not.toBe(expected);
  });

  test('normal input [type 2]', () => {
    const mutate = createMutation(['A', 'B', 'C']);
    const input = 'ABC';
    const expected = input;
    const actual = mutate(input);
    expect(actual.length).toBe(expected.length);
    expect(actual).not.toBe(expected);
  });
});
