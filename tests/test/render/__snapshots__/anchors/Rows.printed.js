export default ($d) => {
  const f1 = ($0, $1) => {
    const ids = $0()([$d[0], $d[1], $d[2]]);
    const clear = () => {
      ids.set([]);
    };
    return [
      element($d[5], [[$d[3], () => clear, false]], () => $d[4]),
      memo(() =>
        component($1(), [
          [$d[6], () => () => ids.get()],
          [
            $d[7],
            () => () => (id) => element($d[5], [], () => () => $d[8] + id),
          ],
        ]),
      ),
    ];
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
