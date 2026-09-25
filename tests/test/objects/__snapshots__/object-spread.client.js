// 17:5
export default () => {
    const base = { a: 1, b: 2 };
    const over = { b: 9 };
    return {
        ...base,
        ...over,
        c: 3,
    };
};
