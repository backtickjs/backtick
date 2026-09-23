export default ($d) => {
  const f1 = () => {
    const rows = [$d[0], $d[1], $d[2]];
    const sorted = rows.toSorted((a, b) => a - b);
    const reversed = rows.toReversed();
    const spliced = rows.toSpliced($d[1], $d[1]);
    const inserted = rows.toSpliced($d[1], $d[3], $d[4]);
    return (
      sorted.join($d[5]) +
      $d[6] +
      reversed.join($d[5]) +
      $d[6] +
      spliced.join($d[5]) +
      $d[6] +
      inserted.join($d[5]) +
      $d[6] +
      rows.join($d[5])
    );
  };
  return f1();
};
