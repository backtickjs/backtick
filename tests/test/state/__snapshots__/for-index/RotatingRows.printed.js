export default ($d) => {
  const f1 = ($0, $1) => {
    const names = $0()([$d[0], $d[1], $d[2]]);
    const rotate = () => {
      const held = names.get();
      names.set([held[$d[3]], held[$d[4]], held[$d[5]]]);
    };
    return element($d[12], [], () => [
      element($d[8], [[$d[6], () => rotate, false]], () => $d[7]),
      element(
        $d[12],
        [],
        () => () =>
          component($1(), [
            [$d[9], () => () => names.get()],
            [
              $d[10],
              () => () => (name, index) =>
                element($d[8], [], () => () => name + $d[11] + index.get()),
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
