// 16:5
export default () => {
  const floor = Math.floor;
  const apply = (f, n) => f(n);
  return floor(3.5) + apply(Math.ceil, 3.5);
};
