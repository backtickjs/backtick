export default ($d) => {
  const f1 = ($0, $1) => {
    const ids = $0()([$d[0], $d[1], $d[2]]);
    const swap = () => {
      const held = ids.get();
      ids.set(held.with($d[3], held[$d[1]]).with($d[1], held[$d[3]]));
    };
    const drop = () => {
      ids.set(ids.get().filter((id) => id !== $d[1]));
    };
    return element($d[11], [], () => [
      element($d[6], [[$d[4], () => swap, false]], () => $d[5]),
      element($d[6], [[$d[4], () => drop, false]], () => $d[7]),
      element(
        $d[11],
        [],
        () => () =>
          component($1(), [
            [$d[8], () => () => ids.get()],
            [
              $d[9],
              () => () => (id) => element($d[6], [], () => () => $d[10] + id),
            ],
          ]),
      ),
    ]);
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
