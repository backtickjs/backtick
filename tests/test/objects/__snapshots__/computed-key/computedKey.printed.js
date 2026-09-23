export default ($d) => {
  const f1 = () => {
    const base = { [$d[0]]: $d[1], [$d[2]]: $d[3] };
    const name = $d[2];
    return Object.fromEntries([
      ...Object.entries(base),
      [name, $d[4]],
      [$d[5] + $d[6], $d[7]],
      [$d[0], $d[8]],
    ]);
  };
  return f1();
};
