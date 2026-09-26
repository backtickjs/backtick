// 8:14
export default () => o => {
  return [o.label, o.inner?.z ?? 0];
};

// 16:5
export default $0 => ({
  present: $0()({
    label: "a",
    inner: {
      z: 3
    }
  }),
  partial: $0()({
    label: "b",
    inner: {}
  }),
  omitted: $0()({
    label: "c"
  })
});
