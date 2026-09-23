export default ($d) => {
  const f1 = () => {
    let out = $d[0];
    for (let i = $d[1]; i < $d[2]; i = i + $d[3]) {
      const i = $d[4];
      for (let j = $d[1]; j < $d[2]; j = j + $d[3]) {
        out = out + i + j;
      }
    }
    return out;
  };
  return f1();
};
