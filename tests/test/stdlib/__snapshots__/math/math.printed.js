export default ($d) => {
  const f1 = () => {
    const rounded =
      Math.round($d[0]) + $d[1] + Math.round($d[2]) + $d[1] + Math.round($d[3]);
    const edges =
      Math.floor($d[4]) + $d[1] + Math.ceil($d[4]) + $d[1] + Math.trunc($d[4]);
    const picks =
      Math.min($d[5], $d[6], $d[7]) +
      $d[1] +
      Math.max($d[5], $d[6], $d[7]) +
      $d[1] +
      Math.abs($d[8]);
    return (
      rounded +
      $d[9] +
      edges +
      $d[9] +
      picks +
      $d[9] +
      Math.sqrt($d[10]) +
      $d[1] +
      Math.sign($d[11]) +
      $d[1] +
      Math.fround($d[12]) +
      $d[9] +
      (Math.PI > $d[13]) +
      $d[1] +
      (Math.E > $d[14])
    );
  };
  return f1();
};
