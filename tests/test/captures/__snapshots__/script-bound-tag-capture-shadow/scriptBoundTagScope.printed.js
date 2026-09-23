export default ($d) => {
  const f1 = ($0) => {
    const twice = (Card) =>
      element($d[3], [], () => [
        memo(() => component(Card, [[$d[0], () => $d[1]]])),
        memo(() => component(Card, [[$d[0], () => $d[2]]])),
      ]);
    return element($d[8], [], () => [
      memo(() => component($0(), [[$d[4], () => () => $d[5]]])),
      memo(() =>
        twice((props) => element($d[7], [], () => () => $d[6] + props.n)),
      ),
    ]);
  };
  return f1(() => ($0) => element($d[9], [], () => () => $0.title()));
};
