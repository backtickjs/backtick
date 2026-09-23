export default ($d) => {
  const f1 = () => {
    const names = [$d[0], $d[1]];
    return names[$d[2]];
  };
  return f1();
};
