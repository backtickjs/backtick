export default ($d) => {
  const f1 = () => {
    return element($d[5], [], () => [
      [element($d[1], [], () => $d[0]), element($d[1], [], () => $d[2])],
      element($d[4], [], () => $d[3]),
    ]);
  };
  return f1();
};
