function mutateBinary(individual) {
  const i = Math.floor(Math.random() * individual.length);
  const v = individual[i] === '0' ? '1' : '0';
  return individual.substr(0, i) + v + individual.substr(i + 1);
}

module.exports = {
  mutateBinary,
};
