export default ($d) => {
  const f1 = () => {
    const doubled = Array.from({ [$d[0]]: $d[1] }, (_, index) => index * $d[2]);
    const empty = Array.from({ [$d[0]]: $d[3] }, (_, index) => index);
    const absent = Array.from({ [$d[0]]: $d[2] }, (value, index) =>
      value === void 0 ? index : $d[4],
    );
    return (
      doubled.join($d[5]) + $d[6] + empty.length + $d[6] + absent.join($d[5])
    );
  };
  return f1();
};
