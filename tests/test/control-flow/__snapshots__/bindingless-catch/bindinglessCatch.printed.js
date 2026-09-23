export default ($d) => {
  const f1 = () => {
    try {
      throw $d[0];
    } catch {
      return $d[1];
    }
  };
  return f1();
};
