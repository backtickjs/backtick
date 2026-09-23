export default ($d) => {
  const f1 = ($0) => ({
    [$d[0]]: $0()(null, $d[1]),
    [$d[2]]: $0()($d[3], $d[1]),
    [$d[4]]: $0()($d[3], $d[5]),
    [$d[6]]: $0()($d[7], $d[5]),
  });
  const f2 = ($0) => (text, upper) => {
    if (upper && text !== null) {
      {
        return text.toUpperCase();
      }
    }
    if ($0() && text !== null && text.charAt($d[8]) === $d[9]) {
      {
        return text.concat($d[10]);
      }
    }
    return $d[11];
  };
  const f3 = () => $d[1];
  return f1(() => f2(f3));
};
