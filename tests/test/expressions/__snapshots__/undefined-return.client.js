// 11:36
export default () => () => "hi";

// 17:5
export default $0 => {
  const stored = $0();
  const caught = $0()();
  return 1;
};
