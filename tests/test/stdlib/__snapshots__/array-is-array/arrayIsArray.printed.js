export default ($d) => {
  const f1 = () => {
    return [
      Array.isArray([]),
      Array.isArray([$d[0], $d[1]]),
      Array.isArray($d[2]),
      Array.isArray({ [$d[3]]: $d[4] }),
      Array.isArray(null),
    ];
  };
  return f1();
};
