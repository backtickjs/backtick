export default ($d) => {
  const f1 = () => {
    const prices = [$d[0], $d[1], $d[2]];
    const total = prices.reduce((sum, price) => sum + price, $d[3]);
    const names = [$d[4], $d[5], $d[6]];
    const joined = names.reduce((all, one, index) => all + index + one, $d[7]);
    const empty = [];
    return (
      total.toFixed($d[2]) +
      $d[8] +
      joined +
      $d[8] +
      empty.reduce((sum, one) => sum + one, $d[3])
    );
  };
  return f1();
};
