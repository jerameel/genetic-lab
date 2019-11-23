import { Characteristic, Individual } from '../types';

export function mutateOrder(individual: Individual) {
  const order = individual.split('').map((v, i) => i);
  const initialPosition = Math.floor(Math.random() * order.length);
  order.splice(initialPosition, 1);
  const k = Math.floor(Math.random() * order.length);
  const targetPosition = order[k];
  let newIdentity =
    individual.substr(0, initialPosition) +
    individual[targetPosition] +
    individual.substr(initialPosition + 1);
  newIdentity =
    newIdentity.substr(0, targetPosition) +
    individual[initialPosition] +
    newIdentity.substr(targetPosition + 1);
  return newIdentity;
}

export function createMutation(sample: Characteristic[]) {
  return (individual: Individual) => {
    const i = Math.floor(Math.random() * individual.length);
    const filteredSample = sample.filter(v => v !== individual[i]);
    const k = Math.floor(Math.random() * filteredSample.length);
    return (
      individual.substr(0, i) + filteredSample[k] + individual.substr(i + 1)
    );
  };
}
