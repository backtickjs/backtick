// 11:5
export default () => {
  let i = 0;
  let seen = "";
  for (; i < 3;) {
    seen = seen + i;
    i = i + 1;
  }
  return seen;
};
