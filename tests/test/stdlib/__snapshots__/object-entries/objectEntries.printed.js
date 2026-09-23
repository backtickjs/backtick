export default ($d) => {
  const f1 = () => {
    const held = { [$d[0]]: $d[1], [$d[2]]: $d[3] };
    const written = Object.fromEntries(
      Object.entries(held).map((pair) => [
        pair[$d[4]],
        JSON.stringify(pair[$d[1]]),
      ]),
    );
    return written.n + $d[5] + written.q;
  };
  return f1();
};
