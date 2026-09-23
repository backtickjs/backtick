export default ($d) => {
  const f1 = () => {
    let count = $d[0];
    const bump = () => {
      count = count + $d[1];
      return count;
    };
    return bump() + bump();
  };
  return f1();
};
