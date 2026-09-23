export default ($d) => {
  return element($d[3], [], () => [
    element($d[1], [], () => $d[0]),
    element($d[1], [], () => $d[2]),
  ]);
};
