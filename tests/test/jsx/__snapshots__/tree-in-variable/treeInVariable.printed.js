export default ($d) => {
  const f1 = ($0) => $0()();
  const f2 = ($0) => () => {
    const tree = $0();
    return tree;
  };
  const f3 = ($0) => $0()();
  const f4 = ($0) => () => {
    const tree = $0();
    return tree;
  };
  return element($d[0], [], () => [
    memo(() => f1(() => f2(() => element($d[0], [], null)))),
    memo(() => f3(() => f4(() => element($d[2], [], () => $d[1])))),
  ]);
};
