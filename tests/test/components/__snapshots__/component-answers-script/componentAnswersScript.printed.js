export default ($d) => {
  const f1 = ($0) => {
    const n = $0()($d[0]);
    return element($d[1], [], () => () => n.get());
  };
  return element($d[2], [], () => () => component(() => f1(() => state), []));
};
