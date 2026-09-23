export default ($d) => {
  const f1 = ($0) => (currency) => {
    const table = $0();
    const asked = table[currency] ?? $d[0];
    const usd = table[$d[1]] ?? $d[0];
    return asked + usd;
  };
  return f1(() => ({ [$d[1]]: $d[2], [$d[3]]: $d[4] }));
};
