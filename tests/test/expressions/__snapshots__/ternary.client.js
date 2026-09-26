// 7:14
export default () => n => {
  return n === null ? 0 : n + 1;
};

// 15:5
export default $0 => ({
  absent: $0()(null),
  present: $0()(4)
});
