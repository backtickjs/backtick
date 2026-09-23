export default ($d) => {
  const f1 = () => {
    let total = $d[0];
    for (let i = $d[0]; i < $d[1]; i = i + $d[2]) {
      total = total + i;
    }
    return total;
  };
  return f1();
};
