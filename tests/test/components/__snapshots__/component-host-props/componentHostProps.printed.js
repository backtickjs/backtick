export default ($d) => {
  return element($d[4], [], () =>
    element($d[3], [[$d[0], () => $d[1], true]], () => $d[2]),
  );
};
