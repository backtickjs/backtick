export default ($d) => {
  const f1 = ($0, $1, $2) => {
    const count = $0()($d[0]);
    const Badge = (p) =>
      element($d[2], [], () => [
        memo(() => $d[1] + p.n),
        memo(() => p.children),
      ]);
    return element($d[8], [], () => [
      memo(() => component($2(), [[$d[3], () => () => $1(count, Badge)]])),
      element(
        $d[7],
        [[$d[4], () => () => count.set(count.get() + $d[5]), true]],
        () => $d[6],
      ),
    ]);
  };
  const f2 = ($0, $1) =>
    component($0, [
      [$d[9], () => $1.get()],
      [$d[10], () => element($d[12], [], () => () => $d[11] + $1.get())],
    ]);
  const f3 = ($0) => {
    const Badge = (p) => element($d[14], [], () => () => $d[13] + p.n);
    return element($d[15], [], () => [
      memo(() => component(Badge, [[$d[9], () => $d[0]]])),
      memo(() => $0().body),
    ]);
  };
  return f1(
    () => state,
    (count, Badge) => f2(Badge, count),
    () => ($0) => f3(() => $0),
  );
};
