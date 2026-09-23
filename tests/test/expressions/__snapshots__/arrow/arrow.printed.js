export default ($d) => {
  const f1 = () => {
    const base = $d[0];
    return (one, two) => one + two + base;
  };
  return f1();
};
