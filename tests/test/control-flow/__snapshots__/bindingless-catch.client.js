// 11:5
export default () => {
  try {
    throw "boom";
  } catch {
    return "caught";
  }
};
