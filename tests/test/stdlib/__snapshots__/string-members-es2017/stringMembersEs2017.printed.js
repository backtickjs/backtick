export default ($d) => {
  const f1 = () => {
    const word = $d[0];
    return {
      [$d[1]]: word.padStart($d[2]) + $d[3] + word.padEnd($d[4], $d[5]),
      [$d[6]]: $d[7].trimStart() + $d[3] + $d[7].trimEnd() + $d[3],
      [$d[8]]: [word.at($d[9]), word.at($d[10]), word.at($d[4])],
      [$d[11]]: $d[12].replaceAll($d[13], $d[14]),
      [$d[15]]: $d[16].replaceAll($d[13], (found, offset) => $d[17] + offset),
    };
  };
  return f1();
};
