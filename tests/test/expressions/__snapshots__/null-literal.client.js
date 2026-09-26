// 7:58
export default () => value => {
  if (value === null) {
    return "-";
  }
  return value;
};

// 20:5
export default $0 => ({
  missing: $0()(null),
  present: $0()("hi"),
  bare: null
});
