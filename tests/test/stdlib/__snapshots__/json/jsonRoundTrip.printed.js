export default ($d) => {
  const f1 = () => {
    const numbers = JSON.stringify([$d[0], $d[1], $d[2]]);
    const text = JSON.stringify($d[3]);
    const flag = JSON.stringify($d[4]);
    const held = JSON.stringify({ [$d[5]]: $d[0], [$d[6]]: $d[7] });
    const back = JSON.parse(numbers);
    return (
      numbers +
      $d[8] +
      text +
      $d[8] +
      flag +
      $d[8] +
      held +
      $d[8] +
      JSON.stringify(back) +
      $d[8] +
      JSON.stringify(JSON.parse(held))
    );
  };
  return f1();
};
