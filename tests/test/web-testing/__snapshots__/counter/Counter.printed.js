export default ($d) => {
  const f1 = ($0) => {
    const count = $0()($d[0]);
    return element($d[7], [], () => [
      element(
        $d[4],
        [[$d[1], () => () => count.set(count.get() + $d[2]), true]],
        () => $d[3],
      ),
      element($d[6], [], () => () => $d[5] + count.get()),
    ]);
  };
  return component(() => f1(() => state), []);
};
