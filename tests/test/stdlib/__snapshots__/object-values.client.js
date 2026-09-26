// 11:5
export default () => {
    const prices = { apple: 1, pear: 2 };
    return {
        values: Object.values(prices),
        holds: [Object.hasOwn(prices, "pear"), Object.hasOwn(prices, "plum")],
    };
};
