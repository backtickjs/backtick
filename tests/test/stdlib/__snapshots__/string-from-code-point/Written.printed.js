export default ($d) => {
  const f1 = () => {
    return element(
      $d[2],
      [],
      () => () => String.fromCodePoint($d[0], $d[1]) + String.fromCodePoint(),
    );
  };
  return component(() => f1(), []);
};
