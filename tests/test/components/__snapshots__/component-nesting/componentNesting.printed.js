export default ($d) => {
  return element($d[2], [], () => element($d[1], [], () => $d[0]));
};
