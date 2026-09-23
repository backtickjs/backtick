export default ($d) => {
  const f1 = () => {
    const positive = Number.EPSILON > $d[0];
    const largest = Number.MAX_VALUE > $d[1];
    const safe =
      Number.MAX_SAFE_INTEGER === $d[2] &&
      Number.MIN_SAFE_INTEGER === $d[3] &&
      Number.MIN_VALUE > $d[0] &&
      Number.isSafeInteger($d[4]) &&
      !Number.isSafeInteger(Number.MAX_SAFE_INTEGER + $d[5]);
    const whole = Number.isInteger($d[6]);
    const fractional = Number.isInteger($d[7]);
    const written = Number.isFinite($d[8]);
    return element(
      $d[10],
      [],
      () => () =>
        whole +
        $d[9] +
        fractional +
        $d[9] +
        written +
        $d[9] +
        positive +
        $d[9] +
        largest +
        $d[9] +
        safe,
    );
  };
  return component(() => f1(), []);
};
