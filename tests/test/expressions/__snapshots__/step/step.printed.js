export default ($d) => {
  const f1 = () => {
    let total = $d[0];
    for (let i = $d[0]; i < $d[1]; i++) {
      total = total + i;
    }
    let n = $d[2];
    const before = n++;
    const after = ++n;
    const down = n--;
    return [total, before, after, down, n];
  };
  return f1();
};
