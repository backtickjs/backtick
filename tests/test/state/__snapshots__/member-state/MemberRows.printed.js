export default ($d) => {
  const f1 = ($0, $1) => {
    const build = (from) => {
      return Array.from({ [$d[0]]: $d[1] }, (_, at) => {
        return { [$d[2]]: from + at, [$d[3]]: $0()($d[4] + (from + at)) };
      });
    };
    const held = $0()(build($d[5]));
    return element($d[14], [], () =>
      element(
        $d[13],
        [[$d[6], () => $d[7], true]],
        () => () =>
          component($1(), [
            [$d[8], () => () => held.get()],
            [
              $d[9],
              () => () => (row) =>
                element(
                  $d[12],
                  [[$d[10], () => () => row.label.set($d[11]), true]],
                  () => () => row.label.get(),
                ),
            ],
          ]),
      ),
    );
  };
  return component(
    () =>
      f1(
        () => state,
        () => ($0) => list(() => $0.each(), $0.children()),
      ),
    [],
  );
};
