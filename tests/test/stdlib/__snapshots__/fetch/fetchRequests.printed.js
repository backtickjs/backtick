export default ($d) => {
  const f1 = ($0, $1) => () => {
    const held = $0()($d[0]);
    $1().fetch(
      $d[1],
      (response) => {
        if (response.status !== $d[2]) {
          {
            throw $d[3] + response.status;
          }
        }
        held.set(JSON.parse(response.text) === null ? $d[4] : $d[5]);
      },
      (message) => {
        held.set($d[6] + message);
      },
      { [$d[7]]: $d[8] },
    );
    $1().fetch(
      $d[9],
      (response) => {
        held.set(response.text);
      },
      (message) => {
        held.set(message);
      },
      {
        [$d[10]]: $d[11],
        [$d[12]]: { [$d[13]]: $d[14] },
        [$d[15]]: JSON.stringify({ [$d[16]]: $d[17], [$d[18]]: $d[19] }),
      },
    );
    return held.get();
  };
  return f1(
    () => state,
    () => window,
  );
};
