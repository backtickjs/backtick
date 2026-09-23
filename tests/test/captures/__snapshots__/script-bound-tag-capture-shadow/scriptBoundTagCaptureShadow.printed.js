export default ($d) => {
  const f1 = ($0, $1, $2) =>
    element($d[2], [], () => [
      memo(() => component($2(), [[$d[0], () => () => $d[1]]])),
      memo(() => $0()),
      memo(() => $1()),
    ]);
  const f2 = ($0, $1) => {
    const Card = (props) => element($d[3], [], () => () => $0() + props.n);
    return element($d[4], [], () => () => $1(Card));
  };
  const f3 = () => $d[5];
  const f4 = ($0) => component($0, [[$d[6], () => $d[7]]]);
  const f5 = () => $d[8];
  return f1(
    () => f2(f3, f4),
    () => f2(f5, f4),
    () => ($0) => element($d[9], [], () => () => $0.title()),
  );
};
