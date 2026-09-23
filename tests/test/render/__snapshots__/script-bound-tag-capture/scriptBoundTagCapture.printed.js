export default ($d) => {
  const f1 = ($0, $1, $2, $3, $4) => {
    const count = $0()($d[0]);
    const Badge = (props) => element($d[2], [], () => () => $d[1] + props.n);
    return element($d[7], [], () => [
      memo(() => $1(count, Badge)),
      memo(() => $2(count, Badge)),
      memo(() => $3(count, Badge)),
      memo(() => $4(count, Badge)),
      element(
        $d[6],
        [[$d[3], () => () => count.set(count.get() + $d[4]), true]],
        () => $d[5],
      ),
    ]);
  };
  const f2 = ($0, $1) => component($0, [[$d[8], () => $1.get()]]);
  const f3 = ($0, $1, $2) => {
    const skipped = $d[9];
    return $0($1, $2);
  };
  const f4 = ($0, $1) => component($0, [[$d[8], () => $1.get() + $d[10]]]);
  const f5 = ($0, $1) => component($0, [[$d[8], () => $1.get() + $d[11]]]);
  const f6 = ($0, $1, $2) =>
    component($0($1, $2), [
      [$d[12], () => () => [$d[4], $d[13]]],
      [$d[14], () => () => (m) => component($1, [[$d[8], () => m * $2.get()]])],
    ]);
  return f1(
    () => state,
    (count, Badge) => f2(Badge, count),
    (count, Badge) => f3(f4, Badge, count),
    (count, Badge) => element($d[15], [], () => () => f5(Badge, count)),
    (count, Badge) =>
      f6(
        (Badge, count) => ($0) => list(() => $0.each(), $0.children()),
        Badge,
        count,
      ),
  );
};
