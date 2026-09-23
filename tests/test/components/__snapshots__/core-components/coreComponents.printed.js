export default ($d) => {
  const f1 = () => () => {};
  return element($d[9], [[$d[0], () => $d[1], true]], () => [
    element(
      $d[5],
      [
        [$d[0], () => $d[2], true],
        [$d[3], () => f1(), false],
      ],
      () => $d[4],
    ),
    element($d[8], [[$d[6], () => $d[7], true]], null),
  ]);
};
