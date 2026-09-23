export default ($d) => {
  const f1 = () => {
    let out = $d[0];
    for (let i = $d[1]; i < $d[2]; i = i + $d[3]) {
      if (i === $d[3]) {
        {
          continue;
        }
      }
      while ($d[4]) {
        out = out + i;
        break;
      }
      if (i === $d[5]) {
        {
          break;
        }
      }
    }
    return out;
  };
  return f1();
};
