// 9:5
export default () => {
  const message = "boom";
  try {
    throw message;
  } catch (error) {
    if (error === message) {
      return "caught boom";
    }
    return "caught something else";
  }
};
