export default ($d) => {
  const f1 = ($0) => {
    const said = $0()($d[0]);
    return element(
      $d[8],
      [
        [
          $d[1],
          () => (event) => {
            event.preventDefault();
            said.set(event.type + $d[2] + event.cancelable);
          },
          true,
        ],
      ],
      () => [
        element(
          $d[4],
          [[$d[3], () => (event) => said.set(event.currentTarget.value), true]],
          null,
        ),
        element(
          $d[5],
          [[$d[3], () => (event) => said.set(event.currentTarget.value), true]],
          null,
        ),
        element(
          $d[7],
          [
            [
              $d[6],
              () => (event) =>
                said.set(event.clientX + $d[2] + event.currentTarget.tagName),
              true,
            ],
          ],
          () => () => said.get(),
        ),
      ],
    );
  };
  return f1(() => state);
};
