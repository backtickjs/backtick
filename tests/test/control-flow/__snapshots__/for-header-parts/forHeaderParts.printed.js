export default ($d) => {
  const f1 = () => {
    let i = $d[0];
    let seen = $d[1];
    for (; i < $d[2]; ) {
      seen = seen + i;
      i = i + $d[3];
    }
    return seen;
  };
  return f1();
};
