export default ($d) => {
  const f1 = () => {
    const message = $d[0];
    try {
      throw message;
    } catch (error) {
      if (error === message) {
        {
          return $d[1];
        }
      }
      return $d[2];
    }
  };
  return f1();
};
