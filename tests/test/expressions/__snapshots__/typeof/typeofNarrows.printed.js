export default ($d) => {
  const f1 = () => {
    const measure = (v) => (typeof v === $d[0] ? v.length : v * $d[1]);
    return [measure($d[2]), measure($d[3])];
  };
  return f1();
};
