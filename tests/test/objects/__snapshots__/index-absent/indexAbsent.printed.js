export default ($d) => {
  const f1 = ($0) => {
    const names = [$d[0], $d[1]];
    const missing = $0()[$d[2]] ?? $d[3];
    return names[$d[4]] + $d[5] + missing;
  };
  return f1(() => ({ [$d[6]]: $d[7] }));
};
