export default ($d) => {
  return element($d[4], [], () => [
    $d[0],
    [element($d[2], [], () => $d[1]), element($d[2], [], () => $d[3])],
  ]);
};
