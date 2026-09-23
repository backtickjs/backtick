export default ($d) => {
  const f1 = () => {
    const base = { [$d[0]]: $d[1], [$d[2]]: $d[3] };
    const over = { [$d[2]]: $d[4] };
    return Object.fromEntries([
      ...Object.entries(base),
      ...Object.entries(over),
      [$d[5], $d[6]],
    ]);
  };
  return f1();
};
