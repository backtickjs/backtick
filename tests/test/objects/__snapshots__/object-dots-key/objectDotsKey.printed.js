export default ($d) => {
  const f1 = () => {
    const base = { [$d[0]]: $d[1] };
    return Object.fromEntries([...Object.entries(base), [$d[2], $d[3]]]);
  };
  return f1();
};
