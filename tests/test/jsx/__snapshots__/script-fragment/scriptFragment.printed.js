export default ($d) => {
  const f1 = ($0) => $0()($d[0]);
  const f2 = () => (name) => [
    element($d[2], [], () => $d[1]),
    element($d[2], [], () => [memo(() => name), $d[3], memo(() => name)]),
  ];
  return element($d[4], [], () => () => f1(f2));
};
