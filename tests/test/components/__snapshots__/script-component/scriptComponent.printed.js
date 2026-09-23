export default ($d) => {
  const f1 = ($0, $1) => {
    return element($d[2], [], () => [
      memo(() => component($0(), [[$d[0], () => () => $d[1]]])),
      memo(() => component($1(), [])),
    ]);
  };
  return f1(
    () => ($0) => element($d[3], [], () => () => $0.title()),
    () => () => element($d[5], [], () => $d[4]),
  );
};
