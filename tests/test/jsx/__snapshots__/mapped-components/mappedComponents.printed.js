export default ($d) => {
  return element($d[4], [], () => [
    element($d[1], [], () => $d[0]),
    element($d[1], [], () => $d[2]),
    element($d[1], [], () => $d[3]),
  ]);
};
