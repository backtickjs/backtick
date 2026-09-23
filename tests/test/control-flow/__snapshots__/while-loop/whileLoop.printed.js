export default ($d) => {
  const f1 = () => {
    let i = $d[0];
    let total = $d[0];
    while (i < $d[1]) {
      total = total + i;
      if (i === $d[2]) {
        {
          return total;
        }
      }
      i = i + $d[3];
    }
    return total;
  };
  return f1();
};
