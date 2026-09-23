export default ($d) => {
  const f1 = ($0) => {
    const page = JSON.parse($0());
    return page.rows[$d[0]] + $d[1] + page.count;
  };
  return f1(() => $d[2]);
};
