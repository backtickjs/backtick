export default ($d) => {
  const f1 = ($0) => {
    const stop = $0().clearInterval;
    const repeating = $0().setInterval(() => $d[0], $d[1]);
    stop(repeating);
    $0().clearTimeout($0().setTimeout(() => $d[0], $d[1]));
  };
  return f1(() => window);
};
