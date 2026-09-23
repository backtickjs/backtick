export default ($d) => {
  const f1 = () => {
    let last = () => $d[0];
    for (let i = $d[0]; i < $d[1]; i = i + $d[2]) {
      last = () => i;
    }
    return last();
  };
  return f1();
};
