export default ($d) => {
  const f1 = () => {
    const xs = [$d[0], $d[1], $d[2], $d[3]];
    const word = $d[4];
    return {
      [$d[5]]: xs.find((x) => x > $d[6]),
      [$d[7]]: xs.find((x) => x > $d[8]) === void 0,
      [$d[9]]: xs.findIndex((x) => x > $d[6]),
      [$d[10]]: xs.findIndex((x) => x > $d[8]),
      [$d[11]]: word.includes($d[12]),
      [$d[13]]: word.startsWith($d[14]),
      [$d[15]]: word.endsWith($d[12], $d[16]),
      [$d[17]]: $d[18].repeat($d[0]),
      [$d[19]]: $d[20].codePointAt($d[21]),
      [$d[22]]: Object.keys({ [$d[23]]: $d[24], [$d[25]]: $d[26] }),
    };
  };
  return f1();
};
