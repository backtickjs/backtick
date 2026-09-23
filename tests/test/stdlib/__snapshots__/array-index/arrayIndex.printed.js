export default ($d) => {
  const f1 = () => {
    const coins = [$d[0], $d[1], $d[2]];
    let total = $d[3];
    for (let i = $d[3]; i < coins.length; i = i + $d[4]) {
      total = total + coins[i];
    }
    return total;
  };
  return f1();
};
