export default ($d) => {
  const f1 = () => ({ [$d[0]]: $d[1] });
  return f1();
};
