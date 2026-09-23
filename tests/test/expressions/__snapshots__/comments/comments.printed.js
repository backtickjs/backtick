export default ($d) => {
  const f1 = () => {
    const count = $d[0];
    if (count === $d[0]) {
      {
        return $d[1];
      }
    }
    return $d[2];
  };
  return f1();
};
