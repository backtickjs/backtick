export default ($d) => {
  const f1 = () => {
    const front = [$d[0], $d[1]];
    const back = [$d[2]];
    const none = [];
    const all = [$d[3], ...front, ...none, ...back, $d[4]];
    const twice = [...all, ...all];
    return all.join($d[5]) + $d[6] + twice.length;
  };
  return f1();
};
