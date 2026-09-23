export default ($d) => {
  const f1 = ($0, $1) => {
    const asked = $0()($d[0]);
    return element($d[6], [], () => [
      element($d[2], [], () => () => $d[1] + asked.get()),
      memo(() =>
        component($1(), [
          [
            $d[3],
            () => () => () => {
              asked.set(asked.get() + $d[4]);
              return asked.get() < $d[5];
            },
          ],
        ]),
      ),
    ]);
  };
  const f2 = ($0, $1, $2, $3, $4) => {
    const items = $0()([]);
    const started = $1().setTimeout(() => {
      if ($2()()) {
        {
          items.set($3());
        }
      }
    }, $d[0]);
    return component($4(), [
      [$d[7], () => () => items.get()],
      [$d[8], () => () => (item) => element($d[9], [], () => () => item)],
    ]);
  };
  return f1(
    () => state,
    () => ($0) =>
      f2(
        () => state,
        () => window,
        () => $0.more(),
        () => [$d[10], $d[11]],
        () => ($0) => list(() => $0.each(), $0.children()),
      ),
  );
};
