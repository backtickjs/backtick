export default ($d) => {
  const f1 = () => {
    let i = $d[0];
    for (;;) {
      if (i === $d[1]) {
        {
          break;
        }
      }
      i = i + $d[2];
    }
    return i;
  };
  return f1();
};
