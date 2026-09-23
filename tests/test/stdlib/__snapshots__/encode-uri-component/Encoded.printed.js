export default ($d) => {
  const f1 = () => {
    return element(
      $d[6],
      [],
      () => () =>
        $d[0] +
        encodeURIComponent($d[1]) +
        $d[2] +
        encodeURIComponent($d[3]) +
        $d[4] +
        decodeURIComponent($d[5]),
    );
  };
  return component(() => f1(), []);
};
