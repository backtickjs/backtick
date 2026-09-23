export default ($d) => {
  const f1 = () => {
    return element(
      $d[4],
      [],
      () => () =>
        String.fromCharCode($d[0], $d[1]) + String.fromCharCode($d[2], $d[3]),
    );
  };
  return component(() => f1(), []);
};
