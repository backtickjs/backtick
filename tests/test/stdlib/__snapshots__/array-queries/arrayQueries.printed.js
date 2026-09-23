export default ($d) => {
  const f1 = () => {
    const coins = [$d[0], $d[1], $d[2], $d[3]];
    return {
      [$d[4]]: [coins.at($d[5]), coins.at($d[6]), coins.at($d[7])],
      [$d[8]]: coins.every((n) => n > $d[5]),
      [$d[9]]: coins.some((n) => n > $d[2]),
      [$d[10]]: coins.findLast((n) => n < $d[2]),
      [$d[11]]: coins.findLastIndex((n) => n < $d[2]),
      [$d[12]]: coins.flatMap((n) => [n, n * $d[13]]),
      [$d[14]]: coins.reduceRight((text, n) => text + n, $d[15]),
      [$d[16]]: coins,
    };
  };
  return f1();
};
