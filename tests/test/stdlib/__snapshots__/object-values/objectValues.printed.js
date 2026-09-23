export default ($d) => {
  const f1 = () => {
    const prices = { [$d[0]]: $d[1], [$d[2]]: $d[3] };
    return {
      [$d[4]]: Object.values(prices),
      [$d[5]]: [Object.hasOwn(prices, $d[2]), Object.hasOwn(prices, $d[6])],
    };
  };
  return f1();
};
