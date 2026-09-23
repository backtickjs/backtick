export default ($d) => {
  const f1 = () => {
    let n = $d[0];
    n += $d[1];
    n -= $d[2];
    n *= $d[3];
    n /= $d[4];
    n %= $d[4];
    let text = $d[5];
    text += $d[6];
    let total = $d[7];
    const answered = (total += $d[3]);
    let x = $d[7];
    x += x = $d[1];
    return [n, text, answered, total, x];
  };
  return f1();
};
