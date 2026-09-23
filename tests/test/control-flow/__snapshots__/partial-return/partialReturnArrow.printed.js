export default ($d) => {
  const f1 = () => {
    const pick = (b) => {
      if (b) {
        {
          return $d[0];
        }
      }
    };
    return [pick($d[1]), pick($d[2])];
  };
  return f1();
};
