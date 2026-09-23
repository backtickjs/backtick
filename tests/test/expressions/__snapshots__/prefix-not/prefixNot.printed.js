export default ($d) => {
  const f1 = () => (ready, count) => {
    if (!ready) {
      {
        return $d[0];
      }
    }
    return !(count > $d[1]) ? $d[2] : $d[3];
  };
  return f1();
};
