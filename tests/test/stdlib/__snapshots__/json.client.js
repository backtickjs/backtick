// 12:5
export default () => {
    const numbers = JSON.stringify([1, 2, 3]);
    const text = JSON.stringify("hi");
    const flag = JSON.stringify(true);
    const held = JSON.stringify({ a: 1, b: "two" });
    const back = JSON.parse(numbers);
    return (numbers +
        "|" +
        text +
        "|" +
        flag +
        "|" +
        held +
        "|" +
        JSON.stringify(back) +
        "|" +
        JSON.stringify(JSON.parse(held)));
};
