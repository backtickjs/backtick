// 19:5
export default $0 => {
  const page = JSON.parse($0());
  return page.rows[0] + " of " + page.count;
};
