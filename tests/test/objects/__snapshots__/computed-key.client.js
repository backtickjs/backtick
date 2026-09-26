// 13:5
export default () => {
  const base = {
    a: 1,
    b: 2
  };
  const name = "b";
  return {
    ...base,
    [name]: 9,
    ["c" + "d"]: 3,
    a: 4
  };
};
