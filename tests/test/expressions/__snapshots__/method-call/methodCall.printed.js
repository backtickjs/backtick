export default ($d) => {
  const f1 = () => {
    const greeting = $d[0];
    return greeting.concat($d[1], $d[2]).toUpperCase();
  };
  return f1();
};
