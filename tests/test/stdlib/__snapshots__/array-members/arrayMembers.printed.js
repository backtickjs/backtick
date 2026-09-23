export default ($d) => {
  const f1 = () => {
    const coins = [$d[0], $d[1], $d[2]];
    const four = $d[3];
    return {
      [$d[4]]: coins.length,
      [$d[5]]: coins.concat([four]),
      [$d[6]]: coins.slice($d[7], $d[1]),
      [$d[8]]: coins.indexOf($d[1]),
      [$d[9]]: coins.concat([$d[1]]).lastIndexOf($d[1]),
      [$d[10]]: coins.includes($d[2]),
      [$d[11]]: coins.join($d[12]),
      [$d[13]]: coins.map((n) => n * $d[1]),
      [$d[14]]: coins.filter((n) => n < $d[2]),
    };
  };
  return f1();
};
