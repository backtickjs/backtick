export default ($d) => {
  const f1 = () => {
    const floor = Math.floor;
    const apply = (f, n) => f(n);
    return floor($d[0]) + apply(Math.ceil, $d[0]);
  };
  return f1();
};
