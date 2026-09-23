export default ($d) => {
  const f1 = () => {
    const whole = Number.parseInt($d[0]);
    const based = Number.parseInt($d[1], $d[2]);
    const fractional = Number.parseFloat($d[3]);
    return element($d[5], [], () => () => whole + based + fractional + $d[4]);
  };
  return component(() => f1(), []);
};
